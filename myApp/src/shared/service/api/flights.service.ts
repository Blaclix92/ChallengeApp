import { Injectable } from '@angular/core';
import { Flight} from '../../model/flight';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable, from } from 'rxjs';
import { catchError, map, tap, finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  public flights : Flight[]=[];
  public data:any;
  public flightsUrl : string = 'https://get.rosterbuster.com/wp-content/uploads/dummy-response.json';  // URL to web api
  constructor(private http: HttpClient,private httpN: HTTP, private loadingCtrl: LoadingController) { }

  getFlight = async () => {
    // return new Promise(resolve => {
    //   this.httpN.get(this.flightsUrl,{},{}).then(data => {
    //     this.flights = JSON.parse(data.data);
    //     //console.log(this.data);
    //     resolve(this.flights);
    //   }, err => {
    //     console.log(err);
    //   });
    // });

    await this.httpN
    .get(this.flightsUrl,{},{})
    .then( response => {
      return response.data})
  }
  async getDataNativeHttp() {
    let loading = await this.loadingCtrl.create();
    await loading.present();
 
    // Returns a promise, need to convert with of() to Observable (if want)!
    from(this.httpN.get(this.flightsUrl, {}, {'Content-Type': 'application/json'})).pipe(
      finalize(() => loading.dismiss())
    ).subscribe(data => {
      this.flights = JSON.parse(data.data);
      console.log(this.flights);
      
    }, err => {
      console.log('Native Call error: ', err);
    });
  }
  getFlightByIndex(index: number) : Flight{
    return this.flights[index];
  }
  getFlightArray() {
    return this.flights;
  }



}
