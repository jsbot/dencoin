import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "../components/dashboard/dashboard.component";
import {MinerComponent} from "../components/miner/miner.component";
import {HistoryComponent} from "../components/history/history.component";

const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'miner', component: MinerComponent},
  {path: 'history', component: HistoryComponent},

]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
