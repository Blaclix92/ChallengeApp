import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  passedId = null;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.passedId = this.activatedRoute.snapshot.paramMap.get('myid');
  }

}
