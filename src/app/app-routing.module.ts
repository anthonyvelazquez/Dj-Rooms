import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DJDisplayComponent } from './djdisplay/djdisplay.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'room/:key',
      children: [
        {path: 'dj', component: DJDisplayComponent},
        {path: 'user', component: SearchComponent}
      ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
