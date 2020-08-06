import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-station-error',
  templateUrl: './station-error.component.html',
  styleUrls: ['./station-error.component.css']
})
export class StationErrorComponent implements OnInit{

  @Input() errorText: string;

  constructor() { }

  ngOnInit(){
  }

}
