import { AveragingPeriod } from './averaging-period';

export interface MeasurementDTO {
    parameter: string;
    value: string;
    lastUpdated: string;
    unit: string;
    sourceName: string;
    averagingPeriod: AveragingPeriod;
}