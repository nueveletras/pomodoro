import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { SettingEffects } from "./setting.effects";
import * as fromAuth from './setting.reducer'

@NgModule({
  imports:[
    StoreModule.forFeature(fromAuth.FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([SettingEffects])
  ]
})

export class SettingFeatureModule {}
