import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public elPasoLat = 31.772543
  public elPasoLon = -106.460953

  constructor(public router: Router) {
  }
}
