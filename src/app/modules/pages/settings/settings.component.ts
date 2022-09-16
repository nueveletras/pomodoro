import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingModel } from 'src/app/modules/pomodoro/shared/models/setting.model';
import { AuthFacadeService } from 'src/app/modules/auth/shared/services/auth-facade.service';
import { SettingFacadeService } from '../../pomodoro/shared/services/setting-facade.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {

  public focusTimeValue!: number
  public longBreakValue!: number
  public breakValue!: number
  public roundsValue!: number
  public isLoading: boolean = true;

  private idUser: string | undefined;
  private userSettings!: SettingModel
  private subs: Subscription = new Subscription

  constructor(
    readonly settingFacade: SettingFacadeService,
    readonly authFacade: AuthFacadeService
  ) {
    this.authFacade.getCurrentUser().subscribe(
      user => {
        this.idUser = user?.uid
      }
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.setSuscriptions()
  }

  setSuscriptions() {
    this.subs.add(this.settingFacade.getLoading().subscribe(
      (isLoading) => this.isLoading = isLoading
    ))

    this.subs.add(this.settingFacade.getSetting().subscribe(
      (setting) => {
        this.userSettings = setting as SettingModel
        if (this.userSettings) {
          this.focusTimeValue = this.userSettings.focusTime
          this.longBreakValue = this.userSettings.longBreak
          this.breakValue = this.userSettings.break
          this.roundsValue = this.userSettings.rounds
        }
      }
    ))
  }

  saveSetting(userSettings: SettingModel) {
    this.settingFacade.update(this.idUser as string, userSettings)
  }

}
