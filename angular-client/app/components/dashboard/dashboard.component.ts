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
  crop(e){


      var data = e.detail;
      var cropper = this.cropper;
      var imageData = cropper.getImageData();
      var previewAspectRatio = data.width / data.height;





    let result  = cropper.getCroppedCanvas();
    console.log('result', cropper.getCanvasData());
      //this.image2.src = result.toDataURL("image/png");


  }

  // Add one person to the API
  addPerson(name, age) {
    this.http.post(`${this.API}/users`, {name, age})
      .subscribe(() => {
        this.getAllPeople();
      })
  }

  // Get all users from the API
  getAllPeople() {
    this.http.get<any>(`${this.API}/users`)
      .subscribe(people => {
        console.log(people)
        this.people = people
      })
  }

  registerWithFacebook() {
    this.http.get(`${this.API}/auth/facebook`)
      .subscribe(people => {
        console.log('result------->', people);
      })
  }

  onChange($event) {

    var selectedFile = $event.target.files[0];
    var reader = new FileReader();
    let context = this;

    reader.onload = function (event: any) {
      context.imageSrc = event.target.result;
      context.image = <HTMLImageElement> document.getElementById('image');
      console.log('context.imageSrc', context.image);

      window.setTimeout(() => {
        console.log('starting cropper');
        context.cropper = new Cropper(context.image, {viewMode: 3,
          dragMode: 'move',
          autoCropArea: 1,
          aspectRatio: 9 / 16});
      }, 3000)



    };

    reader.readAsDataURL(selectedFile);



  }

}

