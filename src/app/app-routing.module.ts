import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Define the routes for the application
const routes: Routes = [
  // Redirect the root path to the WeatherModule using lazy loading
  {path: '', loadChildren: () => import('./wheather/wheather.module').then(m => m.WheatherModule)},
  // Redirect the root path to the WeatherModule using lazy loading
  {path: '**', redirectTo: ''}
];

@NgModule({
  // Initialize the Angular router with the defined routes
  imports: [RouterModule.forRoot(routes)],
  // Export the RouterModule to make its directives, such as RouterLink and RouterOutlet, available for use in other modules
  exports: [RouterModule]
})
export class AppRoutingModule { }
