import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import { Flight } from 'src/app/model/flight';
import { FlightsService } from 'src/app/service/api/flights.service';
import { environment } from '../../../environments/environment';
import { Utils } from '../../service/utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  /**
   * @description Array of Flight objects
   * @property
   */
  public flights: Flight[] = [];

  /**
   * @description Array of unique dates
   * @property
   */
  public dates: any = [];

  /**
   * @description Array of Event objects
   * @property
   */
  public events: any = [];

  /**
   * @description Local storage key
   * @property
   */
  public key: string = "";

   /**
   * @description Home page contructor
   */
  constructor(private utils: Utils,private flightService: FlightsService, public router: Router, private loadingCtrl: LoadingController, private storage: Storage) { }

   /**
   * @description Initialize data on module/page load
   */
  ngOnInit(): void {
    this.loadData();
  }

  /**
   * @description Navigates to page detail with event object
   */
  navToDetail(item: any): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        "flight": JSON.stringify(item)
      }
    };
    this.router.navigate(['detail'], navigationExtras);
  }

  /**
   * @description Load data from local storage
   */
  loadData(): void {
    if (!this.key.match(environment.key)) { this.key = "data" }
    this.getStorage(this.key);
  }

/**
 * @description Takes one string value to display events on the page via local storage or online data
 * @param {string} key
 */
  async getStorage(key: string): Promise<void> {
    await this.storage
    .get(key)
    .then((value: any) => {
        value === null ? this.fetchData() : this.events = value;
      }
    )
  }

  /**
   * @description Gets new data
   * @param {any} event 
   */
  doRefresh(event: any): void {
    this.fetchData();
    event.target.complete();
  }

/**
 *  @description Gets new data by http get request and store it locally 
 */
  async fetchData(): Promise<void> {
    let loading = await this.loadingCtrl.create({ message: 'Loading data...' });
    await loading.present();
    from( this.flightService.getFlight()  
      .then((data)=>{ 
        this.flights = JSON.parse(this.utils.formatDataAttributes(data));
        //Sort data
        this.sortData(this.flights);
        // Set data in local storage
        this.storage.set(this.key, this
          .events);
        
      })
      .finally(() => loading.dismiss()));
  }

/**
 * @description Sort by dates
 * @param {any} data
 */
  sortData(data: any): void {
    this.dates = this.utils.sortDates(data);
    this.sortDataByDate(data);
  }

  /**
   * @description Create events list that is sorted by unique dates
   * @param {Flight[]} flights
   */
  sortDataByDate(flights: Flight[]): void {
    let dataObjects: any = []
    for (let date of this.dates) {
      for (let flight of flights) {
        if (date.match(flight.Date)) {
          if (flight.DutyID === 'SBY') {
            flight.TimeDepart = this.utils.formatTime(flight.TimeDepart);
            flight.TimeArrive = this.utils.formatTime(flight.TimeArrive);
          }
          dataObjects.push(flight)
        };
      }
      this.addFlightEvents(dataObjects, date);
      dataObjects = [];
    }
  }

/**
 * @description Adding event to list
 * @param {string} date
 * @param {any} data
 */
  addFlightEvents(data: any, date: string): void {
    const newDate: string = this.utils.formatDate(date);
    const obj = { Date: newDate, Data: data };
    this.events.push(obj);
  }
}