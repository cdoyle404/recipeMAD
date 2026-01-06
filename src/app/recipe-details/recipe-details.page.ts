import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,IonButton, IonMenuButton } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { MyHTTPServices } from '../services/my-httpservices';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonButton, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList, IonButtons, IonMenuButton]
})
export class RecipeDetailsPage implements OnInit {
  isFavorited = false;
  recIng:string = "";
  fullIngr!:any;
  instruction!:any;
  storId!:any;
  metric!:any;
  us!:any;
  selectedSystem: 'metric' | 'us' = 'metric';
  apiKey="70759a4f7911402abcc53d3c51d3b759"
  options: HttpOptions = {
    url:""
  }
  constructor(private dts:DataService, private mhts: MyHTTPServices, private sds: DataService) { }

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
      this.storId = recipe.data.id;
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
  async addtoFav(){
    this.isFavorited = !this.isFavorited;
    console.log(this.storId);
     if (this.isFavorited) {
    await this.sds.set("favoriteRecipe", this.storId);
     } else {
      //Could not get this to work. 
      
     }
}
}