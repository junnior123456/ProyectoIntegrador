import { Component } from '@angular/core';
import { isLogged } from './components/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged = isLogged;
  title = 'proyecto-integrador';

  logout(){
    this.isLogged = false;
  }
}
