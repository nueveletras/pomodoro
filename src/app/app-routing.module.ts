import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "pages",
    pathMatch: 'full'
  },
  {
    path: "pages/timer",
    loadChildren: () => import('./modules/pages/timer/timer-routing.module').then(m => m.TimerRoutingModule)
  },
  {
    path: "pages/settings",
    loadChildren: () => import('./modules/pages/settings/settings-routing.module').then(m => m.SettingsRoutingModule)
  },
  {
    path: "pages/records",
    loadChildren: () => import('./modules/pages/records/records-routing.module').then(m => m.RecordsRoutingModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
