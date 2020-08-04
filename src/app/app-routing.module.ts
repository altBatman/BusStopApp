import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Style1Component } from './style1/style1.component';
import { Style2Component } from './style2/style2.component';
import { BusstopListComponent } from './style1/busstop-list/busstop-list.component';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { BusstopItemComponent } from './style1/busstop-item/busstop-item.component';


const routes: Routes = [
  {
    path: "style1", 
    component:Style1Component,
    children: [
      {path: "stoplist", component:BusstopListComponent, 
        children:[
          {path: ":id", component:BusstopItemComponent}
        ]
      },
    ]
  },
  {path: "style2", component:Style2Component},
  {path: "**", component: NopageFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
