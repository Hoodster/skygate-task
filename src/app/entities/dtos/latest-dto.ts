import { MeasurementDTO } from './measurement-dto';

export interface LatestMeasurementDTO {
 location: string;
 city: string;
 country: string;
 measurements: MeasurementDTO[];   
}