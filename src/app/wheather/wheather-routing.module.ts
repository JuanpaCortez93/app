import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SearchComponent } from './components/search/search.component';

// Define the routes for the Weather module
const routes : Routes = [
  // MainComponent serves as the parent component for child routes
  {path: '', component: MainComponent, children: [
    // Child route for the 'favorites' path, using the FavoritesComponent
    {path: 'favorites', component:FavoritesComponent},
    // Child route for the 'search' path, using the SearchComponent
    {path: 'search', component:SearchComponent},
    // Redirect any other unknown routes to the 'favorites' path
    {path: '**', redirectTo: 'favorites'}
  ]} 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) // Initialize the router with the defined routes for the Weather module
  ], 
  exports: [
    RouterModule // Initialize the router with the defined routes for the Weather module
  ]
})
export class WheatherRoutingModule { }
