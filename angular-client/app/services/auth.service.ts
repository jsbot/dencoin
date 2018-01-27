import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {
  registerUrl : string = environment.serverUrl+'/register';
  loginUrl : string = environment.serverUrl+'/login';

  constructor(private http: HttpClient){

  }

  register(body: any): Observable<any> {
    console.log('got environment', environment);
    return this.http.post(this.registerUrl, body);
  }
  login(body: any): Observable<any>{
    return this.http.post(this.loginUrl, body);
  }

}
