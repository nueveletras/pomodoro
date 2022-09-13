import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SettingModel } from './modules/pomodoro/shared/models/setting.model';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { filter, tap } from 'rxjs';
import { AuthFacadeService } from './modules/auth/shared/services/auth-facade.service';
import { TaskFacadeService } from '@task/services/task-facade.service';
import { SettingFacadeService } from './modules/pomodoro/shared/services/setting-facade.service';

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
        this.displayName = user?.displayName as string || "Invitado"
        this.settingFacade.search(this.idUser)
        this.taskFacade.search(this.idUser as string)

      } else {
        console.log('User redirected to login');
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
    });
  }

  idUser: string | undefined;
  loggedIn: boolean = false
  userSettings!: SettingModel
  title = 'pomodoro-at';
  displayName: string = '';
  menuItems: MenuItem[] = [];

  ngOnInit(): void {

    this.settingFacade.getError().subscribe(
      (error) => {
        this.messageService.add({severity:'error', summary:'Lo siento :(', detail:error});
      }
    )

    this.settingFacade.getMessage().subscribe(
      (message) => {
        this.messageService.add({severity:'success', summary:'Excelente!!', detail:message});
      }
    )

    this.settingFacade.setNewUser().pipe(
      filter(isNewUser => !!isNewUser),
      tap(() => {
        this.settingFacade.create(this.idUser as string)
      })
    ).subscribe()

    this.getSettings()

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
        label: 'Configuración',
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
