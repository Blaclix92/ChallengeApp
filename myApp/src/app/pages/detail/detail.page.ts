import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Flight } from 'src/app/model/flight';
import { Utils } from '../../service/utils/utils';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  /**
   * @description Flight object
   * @property
   */
  flight : Flight = null;

  /**
   * @description Detail page constructor
   * @param {ActivatedRoute} activatedRoute 
   * @param {Utils} utils 
   */
  constructor(private activatedRoute: ActivatedRoute, private utils: Utils) {
    this.activatedRoute.queryParams.subscribe( params =>{
      if(params && params.flight){
        this.setFlightData(params);
      }
    });
   }

   /**
    * @description Sets flight data received from previous page
    * @param {Params} params 
    */
   setFlightData(params: Params):void {
    this.flight = JSON.parse(params.flight);
    this.flight.Captain = this.utils.formatCrewName(this.flight.Captain);
    this.flight.FirstOfficer = this.utils.formatCrewName(this.flight.FirstOfficer);
    this.flight.FlightAttendant = this.utils.formatCrewName(this.flight.FlightAttendant);
   }

   /**
    * @description ngOnInit
    */
   ngOnInit(){
   }
}
