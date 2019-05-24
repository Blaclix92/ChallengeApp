import { Component } from '@angular/core';
import { FlightsService } from '../../shared/service/api/flights.service';
import { Flight } from '../../shared/model/flight';
import { DetailPage } from '../detail/detail.page';
import { Router } from '@angular/router';
import { NavComponent } from '@ionic/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private flights: Flight[] = [];
  
  constructor(private flightService: FlightsService,public router: Router, public nav: NavController){  }

	ionViewDidEnter() {
		this.getAllFlights();
  }

  navToDetail(){
    // this.router.navigate(['detail']);
    this.nav.navigateForward('/detail/113');
 }
  async getAllFlights() {
    this.flightService.getFlight()
    .subscribe(flights => this.flights = flights);
  }
}
