import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,  IonButton, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { MyHTTPServices } from '../services/my-httpservices';
import { HttpOptions } from '@capacitor/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe-listing',
  templateUrl: './recipe-listing.page.html',
  styleUrls: ['./recipe-listing.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,  IonButton, IonButtons, IonMenuButton]
})
export class RecipeListingPage implements OnInit {
  keyword:string = "";
  apiKey="70759a4f7911402abcc53d3c51d3b759"
  RecInfo!:any;
  options: HttpOptions = {
    url: "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + this.apiKey + "&query="
  }
  constructor(private ds:DataService, private mhs: MyHTTPServices, private dts:DataService, private route1: Router) { }

  ngOnInit() {
    this.getSWord();
  }
    async getSWord(){
    this.keyword = await this.ds.get('storedvalue');
    this.options.url = this.options.url.concat(this.keyword)
    let result = await this.mhs.get(this.options)
    this.RecInfo = result.data.results
    console.log(JSON.stringify(this.RecInfo));
  }

  async Details(id:number){
    await this.dts.set("id", id);
    this.route1.navigate(['/recipe-details']);
   console.log(id);
  }


}
