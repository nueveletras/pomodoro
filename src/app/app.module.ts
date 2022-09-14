import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { TimerModule } from './modules/pages/timer/timer.module';
import { RecordsModule } from './modules/pages/records/records.module';
import { SettingsModule } from './modules/pages/settings/settings.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AuthModule,
    TimerModule,
    RecordsModule,
    SettingsModule,
    SharedModule
  ],
  providers: [
    { provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
