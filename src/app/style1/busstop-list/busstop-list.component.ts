import { Component, OnInit, OnDestroy } from '@angular/core';
import { QueryService } from 'src/app/shared/query.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Station } from 'src/app/shared/station.model';

@Component({
  selector: 'app-busstop-list',
  templateUrl: './busstop-list.component.html',
  styleUrls: ['./busstop-list.component.css']
})
export class BusstopListComponent implements OnInit, OnDestroy{
  busStopName: string;
  busStopList: Station[];
  isLoading: boolean;
  private busStopListSubscription = new Subscription;
  constructor(private query: QueryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.busStopListSubscription = this.route.params.subscribe((params: Params)=>{
      this.busStopName = params['stopName'];
      this.query.getList(params['stopName']);
    });

    this.query.busStopListSubject.subscribe((data)=>{
      this.isLoading = false;
      this.busStopList = data;
    });
  }

  ngOnDestroy(){
    this.busStopListSubscription.unsubscribe();
  }
  
}
