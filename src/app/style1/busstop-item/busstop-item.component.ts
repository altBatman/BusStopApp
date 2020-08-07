import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { QueryService } from 'src/app/shared/query.service';
import * as dvb from 'dvbjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-busstop-item',
  templateUrl: './busstop-item.component.html',
  styleUrls: ['./busstop-item.component.css']
})
export class BusstopItemComponent implements OnInit, OnDestroy{
  id: number;
  name: string;
  isLoading: boolean;
  serverError: boolean;
  private serverErrorSubscription: Subscription;
  errorMessage: string;
  private planSubsription = new Subscription;
  planList: dvb.IMonitor [];
  constructor(private route: ActivatedRoute, private router: Router, private query: QueryService) { }

  ngOnInit(): void {
    this.isLoading= true;

    this.route.params.subscribe((params: Params)=>{
      this.query.getStationData(params['id']);
      this.id = +params['id'];
      this.name = params['stopName'];
    });

    this.planSubsription = this.query.stationPlanSubject
      .subscribe((planRecieved)=>{
        this.planList = planRecieved;
        this.isLoading= false;
      }, (error)=>{
        this.errorMessage= error;
        this.isLoading= false;
      });

    this.serverErrorSubscription = this.query.stationErrorSubject.subscribe((data)=>{
      [this.serverError, this.errorMessage]= data;
      this.isLoading= false;
    });
  };

  ngOnDestroy(){
    this.planSubsription.unsubscribe();
    this.serverErrorSubscription.unsubscribe();
  }

}
