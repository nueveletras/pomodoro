import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { TaskEffects } from "./task.effects";
import * as fromAuth from './task.reducer'

@NgModule({
  imports:[
    StoreModule.forFeature(fromAuth.FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([TaskEffects])
  ]
})

export class TaskFeatureModule {}
