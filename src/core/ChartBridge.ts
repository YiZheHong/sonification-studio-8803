import Highcharts from 'highcharts';
import { GenericObject, deepMerge } from './utils/objects';
import { getSeriesId } from './utils/chartUtils';
import { defaultChartOptions } from './defaultChartOptions';
import { getChartOptionsFromParameters } from './optionsMapper/chartOptionsMapper';
import { getSeriesOptionsFromParameters } from './optionsMapper/seriesOptionsMapper';
import { Store } from 'vuex';

/**
 * Interface between chart-specific logic and the rest of the
 * app.
 */
export class ChartBridge {

    // How often to trigger updates for parameter changes
    private static parameterReactivityIntervalMs = 300;
    // How often to trigger updates for data changes
    private static dataReactivityIntervalMs = 1000;
    // Playback progress bar update interval
    private static updateProgressIntervalMs = 15;

    private chart: GenericObject|null = null;
    private chartOptions: GenericObject = {};
    private chartParametersStore: GenericObject;
    private seriesParametersStore: GenericObject;
    private globalSonifyParametersStore: GenericObject;
    private getStoreParam: (storeId: string, param: string) => any;
    private commitToStore: (id: string, payload?: any) => void;
    private reactivityTimeouts: GenericObject = {};
    private updateProgressInterval: number|null = null;
    private _seReactivityCounter: number|null = null;
    private audioSampleTimeline: GenericObject|null = null;


    /**
     * Construct the class with a Vuex store instance
     */
    constructor(store: Store<any>) {
        this.chartParametersStore = store.state.chartParametersStore;
        this.seriesParametersStore = store.state.seriesParametersStore;
        this.globalSonifyParametersStore = store.state.globalSonifyParametersStore;
        this.commitToStore = (id: string, payload?: any) => store.commit(id, payload);
        this.getStoreParam = (storeId: string, param: string): any => store.state[storeId][param];

        store.subscribe(this.onStoreMutation.bind(this));
    }


    /**
     * Init the class with a chart
     */
    public init(chart: GenericObject): void {
        this.chart = chart;
        this.updateChartOptions();

        // Once we have a chart, we need to trigger reactivity again to force updates
        this.commitToStore('viewStore/triggerParameterReactivity');
        this.commitToStore('viewStore/triggerDataReactivity');
    }


    /**
     * Force chart to update sizing. Sometimes needed when the chart
     * container switches from being invisible to visible.
     */
    public reflowChart(): void {
        setTimeout(() => this.chart?.reflow(), 10);
    }


    /**
     * The purpose of this function is to create a dependency on a
     * reactive property (reactivityCounter) that can be changed elsewhere
     * in the code, and force updates of props that depend on chartBridge
     * functions.
     *
     * This is particularly useful for non-POD structures that contain
     * functions, as they can not be stored in a Vuex store. For example,
     * for components that depend on chart data series objects.
     *
     * Two reactivity counters are provided in the view store,
     * reactToDataUpdates, and reactToParameterUpdates. These are
     * incremented by the ChartBridge class when relevant updates are made.
     *
     * Example:
     *
     * Add a computed property "test" that is computed as follows:
     *      test: () => this.$chartBridge.reactiveGet(
     *              'getCurrentChartOptions', this.reactToParameterUpdates);
     *
     * Whenever "this.reactToParameterUpdates" is updated (e.g. incremented),
     * the value of "test" will update as well, and fetch its result from
     * "getCurrentChartOptions".
     */
    public reactiveGet(func: keyof ChartBridge, reactivityCounter: number, payload?: any): any {
        this._seReactivityCounter = reactivityCounter;

        const res = (this as any)[func](payload);

        if (typeof res === 'object' && res) {
            res._seReactivityCounter = this._seReactivityCounter;
        }

        return res;
    }


    /**
     * Builds the final options passed to the chart for rendering, based on
     * mapping parameters and CSV data.
     */
    public buildChartOptions(csv?: string) {
        // chartOptions contains the current state of the chart mapping parameters
        const chartSettings = this.chartOptions;

        // Need to update the chart data first to know which (new) series to build options for.
        // Only once the CSV has been parsed can we build the series options. This is why
        // series options are built separately.
        const newOptions = Object.assign({
            data: {
                csv: csv || 'null',

                complete: (parseResult: GenericObject) => {
                    const chart = this.chart;

                    if (chart) {
                        // Get ids of series parsed
                        const seriesIds = (parseResult.series || []).map((s: GenericObject, ix: number) => {
                            s.chart = { index: chart.index };
                            s.index = ix;
                            return getSeriesId(s);
                        });

                        // Extend parsed results with series options
                        const seriesOptions = this.buildSeriesOptions(seriesIds);
                        if (seriesOptions) {
                            parseResult.series = deepMerge(parseResult.series, seriesOptions);
                        }
                    }
                }
            }
        }, chartSettings);

        return deepMerge(defaultChartOptions, newOptions);
    }


    public getDataSeries(): Array<GenericObject> {
        return this.chart?.series || [];
    }


    public isPaused(): boolean {
        const timeline = this.chart?.sonification.timeline;
        return timeline && timeline.paths.length && !timeline.atStart();
    }


    public playChart(onEnd?: (e: any) => void) {
        const chart = this.chart;
        if (!chart || !chart.series?.length || this.isPlaying()) {
            return;
        }

        this.startProgressUpdatePolling();

        if (!this.isPaused()) {
            chart.sonify({
                onEnd: (e: any) => {
                    this.stopChart();
                    if (onEnd) {
                        onEnd(e);
                    }
                }
            });
        } else {
            chart.resumeSonify();
        }
    }


    public stopChart() {
        this.stopProgressUpdatePolling();
        this.chart?.cancelSonify();
        this.updatePlayProgress();
    }


    public pauseChart() {
        this.stopProgressUpdatePolling();
        this.chart?.pauseSonify();
    }


    public loopChart() {
        this.playChart((e: GenericObject) => {
            if (!e.cancelled) {
                this.loopChart();
            }
        });
    }


    public playAudioSample(instrument: string) {
        const globalVolume = this.getStoreParam('globalSonifyParametersStore', 'volume');
        const sonificationLib = (Highcharts as any).sonification;
        const getEarconForFreq = (freq: number) =>
            (new sonificationLib.Earcon({
                instruments: [{
                    instrument: instrument,
                    playOptions: {
                        frequency: freq,
                        volume: 1 * globalVolume / 100,
                        duration: 150
                    }
                }]
            }));

        const makeTimelineEvent = (frequency: number, time: number) => (
            new sonificationLib.TimelineEvent({
                eventObject: getEarconForFreq(frequency),
                time: time
            }));

        const timelinePath = new sonificationLib.TimelinePath({
            events: [
                makeTimelineEvent(523, 0),
                makeTimelineEvent(784, 160),
                makeTimelineEvent(1047, 320),
                makeTimelineEvent(1568, 480)
            ]
        });

        let timeline = this.audioSampleTimeline;
        if (timeline) {
            timeline.pause();
        }
        timeline = this.audioSampleTimeline = new sonificationLib.Timeline({
            paths: [timelinePath],
            onEnd() {
                if (timeline) {
                    timeline.pause();
                    timeline.resetCursor();
                }
            }
        }) as GenericObject;
        timeline.play();
    }


    private isPlaying(): boolean {
        return !!Object.keys(this.chart?.sonification?.timeline?.pathsPlaying || {}).length;
    }


    private onStoreMutation(mutation: GenericObject) {
        if (this.isParameterMutation(mutation)) {
            this.queueReactivityUpdate(
                'viewStore/triggerParameterReactivity',
                ChartBridge.parameterReactivityIntervalMs,
                'paramReactivityTimeout',
                () => this.updateChartOptions()
            );
        } else if (this.isDataMutation(mutation)) {
            this.queueReactivityUpdate(
                'viewStore/triggerDataReactivity',
                ChartBridge.dataReactivityIntervalMs,
                'dataReactivityTimeout'
            );
        }
    }


    private isParameterMutation(mutation: GenericObject): boolean {
        return mutation.type.startsWith('chartParameters') ||
            mutation.type.startsWith('seriesParameters') ||
            mutation.type.startsWith('globalSonifyParameters');
    }


    private isDataMutation(mutation: GenericObject): boolean {
        return mutation.type.startsWith('dataStore');
    }


    // Trigger a reactivity update, but only once every X milliseconds.
    private queueReactivityUpdate(
        mutation: string, interval: number, timeoutId: string, beforeTrigger?: Function
    ) {
        const timeouts = this.reactivityTimeouts;
        if (!timeouts[timeoutId]) {
            timeouts[timeoutId] = setTimeout(() => {
                delete timeouts[timeoutId];
                if (beforeTrigger) {
                    beforeTrigger();
                }
                this.commitToStore(mutation);
            }, interval);
        }
    }


    // Chart options are cached for performance, only updated on reactivity trigger
    private updateChartOptions() {
        this.chartOptions = getChartOptionsFromParameters(
            this.globalSonifyParametersStore,
            this.chartParametersStore
        );
    }


    private buildSeriesOptions(seriesIds: string[]): GenericObject[]|null {
        if (this.chart) {
            return getSeriesOptionsFromParameters(
                this.seriesParametersStore.seriesParameters,
                seriesIds
            );
        }
        return null;
    }


    private startProgressUpdatePolling() {
        this.stopProgressUpdatePolling();
        this.updateProgressInterval = setInterval(
            this.updatePlayProgress.bind(this), ChartBridge.updateProgressIntervalMs
        );
    }


    private stopProgressUpdatePolling() {
        if (this.updateProgressInterval) {
            clearInterval(this.updateProgressInterval);
        }
    }


    private updatePlayProgress() {
        const progressPct = this.getCurrentPlayProgressPct();
        this.commitToStore('viewStore/setPlaybackProgress', progressPct);
    }


    // Utility function to get the current timestamp of the event playing on a timeline,
    // plus the expected duration of all previous paths.
    private getTimelineTotalCursorMs(timeline: GenericObject): number {
        const curEvents: Array<GenericObject> = Object.values(timeline.getCursor());
        const curEventTimestamp = curEvents.reduce((maxTime, event): number => {
            return Math.max(maxTime, event.time);
        }, 0);
        const splat = (x: any): any[] => {
            const str = Object.prototype.toString.call(x);
            const isArray = str === '[object Array]' || str === '[object Array Iterator]';
            return isArray ? x : [x];
        };

        let i = timeline.cursor;
        let previousTime = 0;
        if (i > 0) {
            while (i--) {
                const paths = splat(timeline.paths[i]) || [];
                const maxPathDuration = paths.reduce((maxDuration, path) => {
                    return Math.max(maxDuration, path.targetDuration || 0);
                }, 0);

                previousTime += maxPathDuration;
            }
        }

        return previousTime + curEventTimestamp;
    }


    private getCurrentPlayProgressPct(): number {
        const sonification = this.chart?.sonification;
        const timeline = sonification?.timeline;

        if (!timeline || !timeline.paths.length || timeline.atStart()) {
            return 0;
        }

        const curTime = this.getTimelineTotalCursorMs(timeline);
        const totalDuration = sonification.duration;
        const interpolationOffset = 0; // TBD - interpolate between timestamps

        return Math.round((curTime + interpolationOffset) / totalDuration * 100);
    }
}
