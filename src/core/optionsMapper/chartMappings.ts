import { GenericObject } from '../utils/objects';

export class ChartMappings {

    public static type(value: string): GenericObject {
        return { chart: { type: value } };
    }

    public static legendEnabled(value: boolean): GenericObject {
        return { legend: { enabled: value } };
    }
}
