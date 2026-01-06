import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonButtons, IonIcon, IonMenuButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchCircle, cogOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { HttpOptions } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonButtons, FormsModule, IonIcon, IonMenuButton]
})
export class HomePage {
  searchQuery: string = "";

  constructor(private router: Router, private ds: DataService) {
    addIcons({searchCircle, cogOutline});
  }
  handleInput(event: any) {
    this.searchQuery = event.target.value;
  }
  async onSearch(){
    await this.ds.set("storedvalue", this.searchQuery);
    this.router.navigate(['/recipe-listing'])
  }
  async toSettings() {
  this.router.navigate(['/settings']);
}
}
