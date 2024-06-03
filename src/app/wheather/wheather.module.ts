import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WheatherService } from './services/wheather.service';
import { MainComponent } from './components/main/main.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SearchComponent } from './components/search/search.component';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';
import { WheatherRoutingModule } from './wheather-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { DataService } from './services/data.service';

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
    WheatherRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule
  ],
  exports: [
    MainComponent 
  ],
  providers: [
    WheatherService,
    DataService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA 
  ],
})
export class WheatherModule { }
