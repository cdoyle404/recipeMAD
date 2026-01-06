import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton]
})
export class FavouritesPage implements OnInit {

  favourites: any[] = [];

  constructor(private dts: DataService, private router: Router) { }

  ngOnInit() {
    this.loadFavourites();
  }

  async loadFavourites() {
    const fav = await this.dts.get("favoriteRecipe");
    if (Array.isArray(fav)) {
      this.favourites = fav;
    } else if (fav !== null && fav !== undefined) {
      this.favourites = [fav];
    } else {
      this.favourites = [];
    }
    console.log('Loaded favourites', this.favourites);
  }

}
