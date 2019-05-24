import { Measurement } from './dtos/measurement';

export class LatestMeasurement {
    constructor(
        public location: string,
        public city: string,
        public countryCode: string,
        public measurements: Measurement[]
    ) {

    }

}