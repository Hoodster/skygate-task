import { WikipediaQuery } from './wikipedia-query-dto';

export interface WikipediaCityPageDTO {
    batchcomplete?: string;
    query: WikipediaQuery;
}