import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonLabel } from '@ionic/angular/standalone';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonLabel],
})
export class AppComponent {
  constructor(private menu: MenuController, private router: Router) {}

  async navigateTo(path: string) {
    // close the menu first then navigate
    try {
      await this.menu.close('main-menu');
    } catch (e) {
      // ignore close errors
    }
    await this.router.navigate([path]);
  }
}
