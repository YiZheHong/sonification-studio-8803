import { GenericObject } from '../utils/objects';

export class ChartMappings {

    public static type(value: string): GenericObject {
        return { chart: { type: value } };
    }

    public static legendEnabled(value: boolean): GenericObject {
        return { legend: { enabled: value } };
    }

    public static inverted(value: boolean): GenericObject {
        return { chart: { inverted: value } };
    }

    public static title(value: string): GenericObject {
        return { title: { text: value } };
    }

    public static subtitle(value: string): GenericObject {
        return { subtitle: { text: value || null } };
    }

    public static xAxisTitle(value: string): GenericObject {
        return { xAxis: { title: { text: value || null } } };
    }

    public static xAxisType(value: string): GenericObject {
        return { xAxis: { type: value || 'linear' } };
    }

    public static xAxisVisible(value: boolean): GenericObject {
        return { xAxis: { visible: value } };
    }

    public static yAxisTitle(value: string): GenericObject {
        return { yAxis: { title: { text: value || null } } };
    }

    public static yAxisType(value: string): GenericObject {
        return { yAxis: { type: value || 'linear' } };
    }

    public static yAxisVisible(value: boolean): GenericObject {
        return { yAxis: { visible: value } };
    }

    public static seriesLabelsEnabled(value: boolean): GenericObject {
        return { plotOptions: { series: { label: { enabled: value } } } };
    }

    public static zoomType(value: string): GenericObject {
        return { chart: { zoomType: value || null } };
    }
}
