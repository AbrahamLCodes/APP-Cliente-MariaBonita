import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeadComponent } from './head/head.component';
import { BotoneraComponent } from './botonera/Botonera.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './servicios/token.interceptor';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Import the library
import { NgxStripeModule } from 'ngx-stripe';

/*
  Test Stripe KEY ClikGraphics:
  publishable: pk_test_71fBM87Dcnetxs6Yj88ae3uQ00MJqSR1w3
  secret: sk_test_ktOYddaLGOVQ4rCBotbm4IXd00gesIqynf

  LIve Stripe Keys ClikGraphics
  publishable: pk_live_WJk9QHXefqpNy3nlPF2BD8kS00oUf9VXoL

*/

@NgModule({
  declarations: [AppComponent,HeadComponent,BotoneraComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyC3QCWQ4xySdmPUdXOwUJRjPScjXT6SBTU"
    })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    FormBuilder,
    Geolocation
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent],
})
export class AppModule {}
