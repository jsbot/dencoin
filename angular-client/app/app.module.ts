import {BrowserModule} from "@angular/platform-browser";
import {NgModule, Injectable, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./routing/routing.module";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

import {AuthService} from './services/auth.service';
import { LyResizingCroppingImageModule } from 'alyle-ui/resizing-cropping-images';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';



@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    'pan': {threshold: 0}
  };
}


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    LyResizingCroppingImageModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService, {provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
