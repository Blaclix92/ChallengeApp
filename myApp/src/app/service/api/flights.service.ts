import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  
  /**
   * @description Flight service constructor
   * @param {HTTP} httpNative
   */
  constructor(private httpNative: HTTP) { }

  /**
   * @description Get flights from API endpoint
   * @returns {Promise<HTTPResponse>} Response
   */
  async getFlight(): Promise<HTTPResponse> {
    return await this.httpNative.get(environment.apiUrl,{},{ 'Content-Type': 'application/json' });
  }

}
