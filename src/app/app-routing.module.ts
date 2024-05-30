import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './wheather/components/main/main.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./wheather/wheather.module').then(m => m.WheatherModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
