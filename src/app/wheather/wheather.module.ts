import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WheatherService } from './wheather.service';
import { MainComponent } from './components/main/main.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SearchComponent } from './components/search/search.component';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';
import { WheatherRoutingModule } from './wheather-routing.module';



@NgModule({
  declarations: [
    MainComponent,
    FavoritesComponent,
    SearchComponent,
    CardComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    WheatherRoutingModule
  ],
  exports: [
    MainComponent
  ],
  providers: [
    WheatherService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA 
  ],
})
export class WheatherModule { }
