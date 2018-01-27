import { Component, OnInit, } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
//import { ResizingCroppingImagesExample01Component } from '../../common/resizing-cropping-images-example-01/resizing-cropping-images-example-01.component';
import * as Cropper from 'cropperjs';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  title = 'app works!';
  imageSrc = '';
  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  // Declare empty list of people
  people: any[] = [];
  cropper;
  image;
  previews;

  constructor(private http: HttpClient) {

  }


  ngOnInit() {
    this.getAllPeople();
    console.log('dashboard init');

    let _this = this;

    //this.image2 = document.querySelector('#image2');
    this.previews = document.querySelectorAll('.preview');

  }



  // Get all users from the API
  getAllPeople() {
    console.log('ap')
    this.http.get<any>(`${this.API}/`)
      .subscribe(people => {
        console.log(people)
        this.people = people
      })
  }



}

