import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as constants from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CommunService {

  url = new constants.UrlService;
  user;

  constructor(private http: HttpClient) { }

  async login(payload): Promise<any> {
    console.log(payload)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
      // ,
      // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, HEAD',
      // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    })
    //No lleva headers
    return await new Promise((resolve, reject) => {
      this.http.post(this.url.login, payload, {headers}).subscribe(
        (data:any )=> {
          this.user = data;
          resolve(data);
        },
        err => {
          console.log(err)
          resolve(-1)
          //reject(err);
        });
    });
  }

  async compararRostro(payload, token_jwt): Promise<any> {
    console.log(payload)
    const headers = new HttpHeaders({
      Authorization: token_jwt
    })

    return await new Promise((resolve, reject) => {
      this.http.post(this.url.similarity, payload, {headers}).subscribe(
        (data:any )=> {
          resolve(data);
        },
        err => {
          console.log(err)
          resolve(-1)
          //reject(err);
        });
    });
  }

  getToken(){
    return this.user.jwt;
  }
}
