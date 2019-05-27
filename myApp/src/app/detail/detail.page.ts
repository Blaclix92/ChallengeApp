import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flight } from 'src/shared/model/flight';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  passedId = null;
  flight : Flight = null;
  constructor(private activatedRoute: ActivatedRoute) {
    // receives json event object to show on detail page 
    this.activatedRoute.queryParams.subscribe( params =>{
      if(params && params.flight){
        this.flight = JSON.parse(params.flight);
        this.flight.Captain = this.formatCrewName(this.flight.Captain);
        this.flight.FirstOfficer = this.formatCrewName(this.flight.FirstOfficer);
        this.flight.FlightAttendant = this.formatCrewName(this.flight.FlightAttendant);
      }
    });
   }

   ngOnInit(){}

/**
 * Takes one string name value to set white space between first name and last name
 * @param name string name
 * @returns string name
 */
   formatCrewName(name:string){ return name.replace(/([a-z])([A-Z])/g, '$1 $2');}

}
