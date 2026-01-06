import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { MyHTTPServices } from '../services/my-httpservices';
import { Router } from '@angular/router';
import { cogOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList]
})
export class RecipeDetailsPage implements OnInit {
  recIng:string = "";
  fullIngr!:any;
  instruction!:any;
  metric!:any;
  us!:any;
  selectedSystem: 'metric' | 'us' = 'metric';
  apiKey="70759a4f7911402abcc53d3c51d3b759"
  options: HttpOptions = {
    url:""
  }
  constructor(private dts:DataService, private mhts: MyHTTPServices, private router: Router) {
     addIcons({ cogOutline});
   }

  ngOnInit() {
    this.getRecipeIn();
    this.loadMeasure();
  }

    async getRecipeIn(){
      this.recIng = await this.dts.get("id");
      console.log(this.recIng);
      let startURL = 'https://api.spoonacular.com/recipes/';
      let endURL = "/information?apiKey=";
      this.options.url = startURL + this.recIng + endURL + this.apiKey
      let recipe = await this.mhts.get(this.options)
      this.fullIngr = recipe.data.extendedIngredients
      this.instruction = recipe.data.analyzedInstructions[0].steps;
      console.log(JSON.stringify(this.instruction));

    }

    async loadMeasure() {
    const saved = await this.dts.get('measurementSystem');
    if (saved) {
      this.selectedSystem = saved;
    } else {
      // Default to metric if nothing saved
      this.selectedSystem = 'metric';
    }
    console.log('Recipe Details - Using measurement system:', this.selectedSystem);
  }
    async toSettings() {
  this.router.navigate(['/settings']);
}
}
