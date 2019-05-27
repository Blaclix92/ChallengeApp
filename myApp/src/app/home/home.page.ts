import { Component } from '@angular/core';
import { FlightsService } from '../../shared/service/api/flights.service';
import { Flight } from '../../shared/model/flight';
import { NavController, LoadingController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public flights: Flight[] = []
  public dates: any = []
  public events: any = []
  public key: string = ""
  public flightsUrl: string = 'https://get.rosterbuster.com/wp-content/uploads/dummy-response.json';  // URL to web api

  constructor(private flightService: FlightsService, public nav: NavController, public router: Router, private httpN: HTTP, private loadingCtrl: LoadingController, private storage: Storage) { }

  ngOnInit() {
    this.initialData();
  }

  navToDetail(item: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "flight": JSON.stringify(item)
      }
    };
    this.router.navigate(['detail'], navigationExtras);
  }
  /**
   * Sets the key value as string data
   * Call getStorage to load data on home page.
   */
  initialData() {
    if (!this.key.match("data")) { this.key = "data" }
    this.getStorage(this.key);
  }

  /**
 * Takes one string value to display events on the page via local storage or online data
 * @param key first input to get events in local storage
 */
  async getStorage(key: string) {
    await this.storage.get(key).then(
      value => {
        if (value == null) { this.getDataNativeHttp(); }
        else { this.events = value; }
      }
    )
  }
  /**
   * Takes one event and gets data online
   * @param event first input to execute doRefresh to get new data
   */
  doRefresh(event) {
    this.getDataNativeHttp();
    event.target.complete();
  }

/**
 * Gets new data by http get request
 * Json data string value is formated to remove empty white space " " and underscore "_"
 * Json events data will be sorted by dates
 * Json events sorted data is saved locally 
 */
  async getDataNativeHttp() {
    let loading = await this.loadingCtrl.create({ message: 'Loading data...' });
    await loading.present();
    from(this.httpN.get(this.flightsUrl, {}, { 'Content-Type': 'application/json' }))
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(data => {
        this.flights = JSON.parse(this.formatDataAtributes(data));
        //Sort data
        this.sortData(this.flights);
        // Set data in local storage
        this.storage.set(this.key, this.events);
      }, err => {
        // maybe do something
      });
  }

  /**
 * Takes one data value to sort by dates
 * @param data input of json events
 */
  sortData(data: any) {
    this.sortDates(data);
    this.sortDataByDate(data);
  }

  /**
   * Takes one data value to create a new array of sorted dates for events
   * @param flights input of json events
   */
  sortDates(flights: Flight[]) {
    let data: any = [];
    for (let item of flights) {
      if (!data.includes(item.Date)) { data.push(item.Date) };
    }
    this.dates = data;
  }

  /**
   * Takes one data value to create events list sorted by dates
   * @param flights input of json events
   */
  sortDataByDate(flights: Flight[]) {
    let dataObjects: any = []
    for (let date of this.dates) {
      for (let flight of flights) {
        if (date.match(flight.Date)) {
          if (flight.DutyID == 'SBY') {
            flight.TimeDepart = this.formatTime(flight.TimeDepart);
            flight.TimeArrive = this.formatTime(flight.TimeArrive);
          }
          dataObjects.push(flight)
        };
      }
      this.addFlightEvents(dataObjects, date);
      dataObjects = []
    }
  }

  /**
   * Takes one string value of time format by hours and minutes
   * @param flights input of json events
   */
  formatTime(time: string) {
    let splitted = time.split(":", 3);
    let hh = splitted[0];
    let mm = splitted[1];
    return hh + ":" + mm
  }
  /**
   * Takes one data value of json events to remove all " " and "_"
   * @param flights input of json events
   */
  formatDataAtributes(data: any) {
    let regex = JSON.stringify(JSON.parse(data.data)).replace(/[._ ]+/g, "");
    return regex;
  }

/**
 *Takes two input value to create an sorted events list by date
 * @param data list of events objects
 * @param date date of events objects
 */
  addFlightEvents(data: any, date: any) {
    let newDate: string = this.formatDate(date);
    let obj = { Date: newDate, Data: data };
    this.events.push(obj);
  }

/**
 *Takes one input date value to format date by month, day and year
 * @param date string date value
 * @returns date
 */
  formatDate(date:any){
    var splitted = date.split("/", 3);
    var day = splitted[0];
    var month = splitted[1];
    var year = splitted[2];
    return month + "/" + day + "/" + year;
  }

}