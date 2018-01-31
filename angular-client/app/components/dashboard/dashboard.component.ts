import { Component, OnInit } from '@angular/core';
import {FormGroup,  FormControl } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";



@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  API = 'http://localhost:3000';
  amount = 100;
  data = {
    "data":{
      "from": "test1"
    }
  }
  denCoinForm = new FormGroup ({
    recipient : new FormControl(),
    amount : new FormControl(),
  });

  message = '';
  showMessage = false;
  constructor(private http: HttpClient) {

  }


  ngOnInit() {
    this.getAmount();

  }


  getAmount() {
    this.http.post<any>(`${this.API}/amount`, this.data, )
      .subscribe(res => {
        this.amount = (typeof res.amount !== 'string')? res.amount : 0;

      })
  }


  sendTransaction(){
    let _this =this;
    let transaction = {
      data: {
        key: this.denCoinForm.controls['recipient'].value,
        amount: this.denCoinForm.controls['amount'].value,
        from: "test1"
      }
    }

    this.http.post<any>(`${this.API}/addTransaction`, transaction)
      .subscribe(res => {
        console.log(res);
        _this.getAmount();
        _this.showMessage = true;
        _this.message = res.message;
        setTimeout(() => {
          _this.showMessage = false;
          _this.message = '';
        }, 4000);
      })

  }
}




}

