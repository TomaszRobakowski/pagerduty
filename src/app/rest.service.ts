import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


const endpoint = 'https://pokeapi.co/api/v2/pokemon/'; 


@Injectable({
  providedIn: 'root'
})


export class RestService {

  constructor(private http: HttpClient) {  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getPokemonsList(_limit : number, _offset: number): Observable<any> {  

    return this.http.get(endpoint  +
                         '?limit=' + _limit.toString()+
                         '&offset=' + _offset.toString() 
                         ) .pipe(
      map(this.extractData));
  }

  getPokemonDetails(_id: string): Observable<any> {  
    let req = endpoint+ _id+'/';
    let res = this.http.get(req); 

    return res.pipe(
      map(this.extractData)
    );
  }

}
