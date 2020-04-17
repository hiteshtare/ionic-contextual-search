import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from './data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  searchTerm: string = "";
  jsonData: any;

  constructor(public navCtrl: NavController, public dataService: DataService) {
  }

  ionViewDidLoad() {
    this.setFilteredItems();
  }

  async setFilteredItems() {
    this.jsonData = await this.dataService.contextualSearch(this.searchTerm);
  }
}