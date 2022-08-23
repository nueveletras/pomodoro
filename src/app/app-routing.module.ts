import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsComponent } from './components/records/records.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TimerComponent } from './components/timer/timer.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "timer",
    pathMatch: 'full'
  },
  {
    path: "timer",
    component: TimerComponent
  },
  {
    path: "settings",
    component: SettingsComponent
  },
  {
    path: "records",
    component: RecordsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
