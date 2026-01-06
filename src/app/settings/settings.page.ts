import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonItem, IonLabel, IonList, IonRadio, IonRadioGroup } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { IonButtons, IonMenu, IonMenuButton, MenuController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup, IonButtons ]
})
export class SettingsPage implements OnInit {
  selectedSystem: 'metric' | 'us' = 'metric';
 

   constructor(private dss: DataService, private router: Router) {}

   ngOnInit() {
     this.loadSettings();
  }

  async loadSettings() {
    const saved = await this.dss.get('measurementSystem');
    if (saved) {
      this.selectedSystem = saved;
    }
    console.log(this.selectedSystem);
  }

  async onSystemChange() {
    
    await this.dss.set('measurementSystem', this.selectedSystem);
    console.log('Measurement system:', this.selectedSystem);
  }

  async navigateToHome() {
  this.router.navigate(['/home']);
}

async navigateToSettings() {
  this.router.navigate(['/settings']);
}

}
