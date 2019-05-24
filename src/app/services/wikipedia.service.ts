import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { text } from '@fortawesome/fontawesome-svg-core';
import { WikipediaCityPageDTO } from '../entities/dtos/wikipedia-city-page-dto';
import { WikipediaObject } from '../entities/wikipedia-object';
import { WikipediaQueryRedirects } from '../entities/dtos/wikipedia-query-redirects-dto';
import { WikipediaCityId } from '../entities/wikipedia-city-id';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  constructor(private http: HttpClient) { }

  getMostPollutedCitiesInformation(cityNames :string[]): Promise<WikipediaObject[]> {
    return this._getWikiPagesIds(cityNames).then((cityIds: WikipediaCityId[]) => {
      return this._getCitiesDescription(cityIds);
    })
  }

  private _getWikiPagesIds(cityNames :string[]): Promise<WikipediaCityId[]> {
    return new Promise((resolve, reject) => {
      const namesInString = cityNames.reduce((prev, curr, currId) =>{
        return (currId === (cityNames.length - 1)) ? prev += `${curr}` : prev += `${curr}|`;
      } , '');

      this.http.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${namesInString}`)
      .subscribe((wikiData: WikipediaCityPageDTO) => {
        const idsObjectsArray = [];

        for (const keyName in wikiData.query.pages) {
          const idObject = wikiData.query.pages[keyName]

          idsObjectsArray.push(new WikipediaCityId(idObject.pageid, idObject.title))
        }

        resolve(idsObjectsArray);
      })
    })
  }

  private _getCitiesDescription(siteIds: WikipediaCityId[]): Promise<WikipediaObject[]> {
    return new Promise((resolve, reject) => {
      const idsInString = siteIds.reduce((prev, curr, currId) => {
        return (currId === (siteIds.length - 1)) ? prev += `${curr.id}` : prev += `${curr.id}|`;
      } , '');

      this.http.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&redirects=1&pageids=${idsInString}`)
      .subscribe((wikiData: WikipediaCityPageDTO) => {
        const responseArray = [];

        for (const keyName in wikiData.query.pages) {
          if (keyName !== '0') {
            const idObject = wikiData.query.pages[keyName];
            const wikiObject = new WikipediaObject(idObject.title, idObject.extract);
            responseArray.push(wikiObject);
          }
        }

        resolve(responseArray);
      })
    })
  }
}
