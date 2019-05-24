
export class Measurement {
    constructor(
        public parameter: string,
        public measurementValue: string,
        public lastUpdated: string,
        public unit: string,
        public sourceName: string,
    ) {

    }
}