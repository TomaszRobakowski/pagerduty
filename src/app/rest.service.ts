import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

// const endpoint = 'https://tprojekt.pagerduty.com/api/v1/';
const endpoint = 'https://api.pagerduty.com/';



@Injectable({
  providedIn: 'root'
})


export class RestService {

  constructor(private http: HttpClient) {  }



  /*
API Key	
5qyzwkFu8b32EvtzmFMq
Description	tprojekt
API Version	v2 Current (documentation)
Access Level	Full access
  */

  getPagerEndpoint(_cmd){ 
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/vnd.pagerduty+json;version=2');
    headers = headers.set('Authorization', 'Token token=VnJThFnBzzBk-zt1yczw');
    let uri = endpoint+_cmd;
    return this.http.get(uri, { headers: headers }).pipe(map(this.extractData));
    //return this.http.get(pager2, { headers: headers }).pipe(map(this.extractData));
  }

 private extractData(res: Response) {
  let body = res;
  return body || { };
}

}
