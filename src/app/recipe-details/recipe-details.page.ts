import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { HttpOptions } from '@capacitor/core';
import { MyHTTPServices } from '../services/my-httpservices';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RecipeDetailsPage implements OnInit {
  recIng:string = "";
  fullIngr!:any;
  apiKey="70759a4f7911402abcc53d3c51d3b759"
  options: HttpOptions = {
    url:""
  }
  constructor(private dts:DataService, private mhts: MyHTTPServices) { }

  ngOnInit() {
    this.getRecipeIn();
  }

    async getRecipeIn(){
      this.recIng = await this.dts.get("id");
      console.log(this.recIng);
      let startURL = 'https://api.spoonacular.com/recipes/';
      let endURL = "/information?apiKey=";
      this.options.url = startURL + this.recIng + endURL + this.apiKey
      console.log(this.options.url);
      let recipe = await this.mhts.get(this.options)
      this.fullIngr = recipe.data.extendedIngredients
      console.log(JSON.stringify(this.fullIngr));

    }

}
