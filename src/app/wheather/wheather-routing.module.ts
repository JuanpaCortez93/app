import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SearchComponent } from './components/search/search.component';

const routes : Routes = [
  {path: '', component: MainComponent, children: [
    {path: 'favorites', component:FavoritesComponent},
    {path: 'search', component:SearchComponent},
    {path: '**', redirectTo: 'favorites'}
  ]} 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class WheatherRoutingModule { }
