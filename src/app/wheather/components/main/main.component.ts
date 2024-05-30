import { Component, OnInit } from '@angular/core';
import { WheatherService } from '../../wheather.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  private _wheatherService:WheatherService;

  constructor(wheatherService:WheatherService){
    this._wheatherService = wheatherService;
  }

  ngOnInit(): void {
    
  }
  
}