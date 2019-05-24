import { Injectable } from '@angular/core';
import { Flight} from '../../model/flight';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  public flights : Observable<Flight[]> 
  private flightsUrl = 'https://get.rosterbuster.com/wp-content/uploads/dummy-response.json';  // URL to web api
  constructor(
    private http: HttpClient) { }

  getFlight(): Observable<Flight[]>{
    return  this.flights = this.http.get<Flight[]>(this.flightsUrl);
  }

  getFlightByIndex(index): Flight{
    return this.flights[index];
  }
}
