import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { QueryService } from 'src/app/shared/query.service';

@Component({
  selector: 'app-busstop-item',
  templateUrl: './busstop-item.component.html',
  styleUrls: ['./busstop-item.component.css']
})
export class BusstopItemComponent implements OnInit {
  id: number;
  name: string;
  constructor(private route: ActivatedRoute, private router: Router, private query: QueryService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.id = +params['id'];
    });

    this.name = this.query.getString();
  }

}
