import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SettingModel } from './modules/pomodoro/shared/models/setting.model';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { SettingFacadeService } from './modules/pomodoro/shared/services/setting-facade.service';
import { TaskFacadeService } from '@task/services/task-facade.service';
import { AuthFacadeService } from '@auth/services/auth-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]

})
export class AppComponent implements OnInit {

  constructor(
    private auth: Auth,
    private router: Router,
    private authFacade: AuthFacadeService,
    readonly settingFacade: SettingFacadeService,
    readonly taskFacade: TaskFacadeService,
    private messageService: MessageService

  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        console.log('User authenticated');
        this.loggedIn = true
        this.authFacade.setCurrentUser(user)
        this.idUser = user?.uid
        this.displayName = user?.displayName || "Invitado"
        this.settingFacade.search(this.idUser)
        this.taskFacade.search(this.idUser)

      } else {
        console.log('User redirected to login');
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
    });
  }

  public idUser: string | undefined;
  public loggedIn: boolean = false
  public title = 'pomodoro-at';
  public displayName: string = '';
  public menuItems: MenuItem[] = [];

  protected userSettings!: SettingModel

  ngOnInit(): void {
    this.setSuscriptions()
    this.getSettings()
    this.setMenuItems()
  }

  setSuscriptions() {
    this.settingFacade.getError().subscribe(
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Lo siento :(', detail: error });
      }
    )

    this.settingFacade.getMessage().subscribe(
      (message) => {
        this.messageService.add({ severity: 'success', summary: 'Excelente!!', detail: message });
      }
    )

    this.settingFacade.setNewUser().pipe(
      filter(isNewUser => !!isNewUser),
      tap(() => {
        this.settingFacade.create(this.idUser as string)
      })
    ).subscribe()
  }

  setMenuItems() {
    this.menuItems = [
      {
        label: 'Temporizador',
        icon: "pi pi-clock",
        routerLink: "/timer"
      },
      {
        label: 'Registros',
        icon: "pi pi-list",
        routerLink: "/records"
      },
      {
        label: 'Configuraci??n',
        icon: "pi pi-cog",
        routerLink: "/settings"
      }
    ];
  }

  getSettings() {
    this.settingFacade.getSetting().subscribe((setting) => {
      this.userSettings = setting as SettingModel
    })
  }
}
