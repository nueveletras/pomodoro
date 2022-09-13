import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./auth.effects";
import * as fromAuth from './auth.reducer'

@NgModule({
  imports:[
    StoreModule.forFeature(fromAuth.FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})

export class AuthFeatureModule {}
