import {BrowserModule} from "@angular/platform-browser";
import {NgModule, Injectable, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./routing/routing.module";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {MinerComponent} from "./components/miner/miner.component";
import {HistoryComponent} from "./components/history/history.component";




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MinerComponent,
    HistoryComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
