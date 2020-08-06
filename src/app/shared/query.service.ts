import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import * as dvb from 'dvbjs'
import { Station } from './station.model'
import { HttpClient } from '@angular/common/http';
import { error } from 'protractor';

@Injectable({providedIn: "root"})

export class QueryService {

    busStopListSubject = new Subject<Station []>();
    stationPlanSubject = new Subject<dvb.IMonitor []>();
    stationErrorSubject = new Subject<[boolean, string]>();

    private busStopList : Station[];
    private stationPlan : dvb.IMonitor [];

    constructor(private http: HttpClient){}

    getList(searchTerm: string){
        this.http.get<Station[]>(`http://localhost:8080/api/search/${searchTerm}`)
            .subscribe ( (data)=>{
                this.busStopList = data;
                if(data.length>10){
                    this.busStopListSubject.next(this.busStopList.slice(0,10));
                } else {
                    this.busStopListSubject.next([...this.busStopList]);
                }
            }, (error)=>{
                console.log(`Server Connection not possible ${error}`);
            });
    };

    getStationData(stationId : string){
        this.http.get<dvb.IMonitor[]>(`http://localhost:8080/api/plan/${stationId}`)
            .subscribe( (data) => {
                this.stationPlan = data;
                this.stationErrorSubject.next([false,null]);
                this.stationPlanSubject.next([...this.stationPlan]);
            }, (err) =>{
                this.stationErrorSubject.next([true, err.error]);
                console.log(`Server Connection not possible in item ${err.error}`);
            })
    }

}