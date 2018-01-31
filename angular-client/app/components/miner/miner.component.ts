import { Component, OnInit, } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";


@Component({
  selector: 'miner',
  templateUrl:'miner.component.html',
  styleUrls: ['miner.component.css'],
})
export class MinerComponent implements OnInit {

  API = 'http://localhost:3000';
  amount = 100;
  status = '';
  showMessage = false;

  constructor(private http: HttpClient) {

  }


  ngOnInit() {
    console.log('miner init');
  }



  // Get all users from the API
  mine() {
    let _this = this;
    let data = {
      data: 'mine data'
    }

        this.http.post<any>(`${this.API}/mineBlock`, data, )
          .subscribe(res => {
            this.status = 'Mining successfully finished. Check your account';
            this.showMessage = true;
            setTimeout(() => {
              _this.showMessage = false;
              _this.status = '';
            }, 4000);

          })
    }

}

