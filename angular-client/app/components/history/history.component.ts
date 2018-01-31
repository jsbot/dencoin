import { Component, OnInit, } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";


@Component({
  selector: 'history',
  templateUrl:'history.component.html',
  styleUrls: ['history.component.css'],
})
export class HistoryComponent implements OnInit {

  API = 'http://localhost:3000';
  transactions = {};
  data = {
    "data":{
      "from": "test1"
    }
  }
  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('history init');
    this.getHistory();
  }

  getHistory() {
    this.http.post<any>(`${this.API}/history`, this.data )
      .subscribe(res => {
        this.transactions = res.transactions;
      })
  }


}

