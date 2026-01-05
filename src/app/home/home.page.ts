import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchCircle } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { HttpOptions } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonButtons, FormsModule],
})
export class HomePage {
  searchQuery: string = "";

  constructor(private router: Router, private ds: DataService) {
    addIcons({searchCircle});
  }
  handleInput(event: any) {
    this.searchQuery = event.target.value;
  }
  async onSearch(){
    await this.ds.set("storedvalue", this.searchQuery);
    this.router.navigate(['/recipe-listing'])
  }
//  async onSearch() {
//     console.log('Search query:', this.searchQuery);
    
//     // Now you can use this.searchQuery to make your API call
//     await this.searchRecipesByIngredients(this.searchQuery);
//   }

  // async searchRecipesByIngredients(ingredients: string) {
  //   // Example API call
  //   const apiKey = '70759a4f7911402abcc53d3c51d3b759';
  //    this.http.get(`https://api.spoonacular.com/recipes/complexSearch?query=${ingredients}`)
  //      .subscribe(response => {
  //        console.log('Results:', response);
  //      });
  // }
}
