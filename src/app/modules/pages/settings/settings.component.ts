import { Component, OnInit } from '@angular/core';
import { SettingModel } from 'src/app/modules/pomodoro/shared/models/setting.model';
import { MessageService } from 'primeng/api';
import { AuthFacadeService } from 'src/app/modules/auth/shared/services/auth-facade.service';
import { SettingFacadeService } from '../../pomodoro/shared/services/setting-facade.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  providers: [MessageService]
})
export class SettingsComponent implements OnInit {

  userSettings!: SettingModel

  focusTimeValue!: number
  longBreakValue!: number
  breakValue!: number
  roundsValue!: number
  idUser: string | undefined;
  isLoading: boolean = true;

  constructor(
    readonly settingFacade: SettingFacadeService,
    readonly authFacade: AuthFacadeService,
    private messageService: MessageService
  ) {
    this.authFacade.getCurrentUser().subscribe(
      user => {
        this.idUser = user?.uid
      }
    )
  }

  ngOnInit(): void {

    this.settingFacade.getLoading().subscribe(
      (isLoading) => this.isLoading = isLoading
    )

    this.settingFacade.getMessage().subscribe(
      (message) => {
        this.messageService.add({ severity: 'success', summary: 'Excelente!!', detail: message });
      }
    )

    this.settingFacade.getSetting().subscribe(
      (setting) => {
        this.userSettings = setting as SettingModel
        if (this.userSettings) {
          this.focusTimeValue = this.userSettings.focusTime
          this.longBreakValue = this.userSettings.longBreak
          this.breakValue = this.userSettings.break
          this.roundsValue = this.userSettings.rounds
        }
      }
    )

  }

  saveSetting(userSettings: SettingModel) {
    this.settingFacade.update(this.idUser as string, userSettings)
  }

}
