import {Component, OnInit} from '@angular/core';
import { hideHTML } from './services/hidehtml';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{



  ngOnInit() {
  }
// Llama a la función hideHTML importada desde hidehtml.ts
  toggleHTML() {
    hideHTML();
  }
}
