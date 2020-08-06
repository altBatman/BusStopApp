import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QueryService } from '../shared/query.service';

@Component({
  selector: 'app-style1',
  templateUrl: './style1.component.html',
  styleUrls: ['./style1.component.css']
})
export class Style1Component implements OnInit {

  @ViewChild('searchTerm') searchTerm;

  constructor(private router: Router, private route: ActivatedRoute, private query: QueryService) { }

  ngOnInit(): void {
  }

  onSearch(){
    if(this.searchTerm.nativeElement.value){
      this.router.navigate([this.searchTerm.nativeElement.value], {relativeTo: this.route});
    }
  }

}
