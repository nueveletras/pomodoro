import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthFeatureModule } from './store/auth/auth-feature.module';
import { environment } from 'src/environments/environment';
import { SettingFeatureModule } from './store/setting/setting-feature.module';
import { TaskFeatureModule } from './store/task/task-feature.module';
import { LayoutModule } from '../modules/layout/layout.module';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: false,
        strictActionSerializability: false
      }
    }),
    EffectsModule.forRoot(),
    AuthFeatureModule,
    SettingFeatureModule,
    TaskFeatureModule,
    StoreDevtoolsModule.instrument({
      maxAge: 40,
      logOnly: environment.production
    }),
    LayoutModule

  ],
  exports: [
    LayoutModule
  ]
})

export class CoreModule {
  static forRoot(){
    return {
      ngModule: CoreModule
    }
  }
}
