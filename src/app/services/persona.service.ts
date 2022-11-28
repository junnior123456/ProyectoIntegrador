import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private url = "http://localhost:8080/api/persona/";

  constructor(
    private _http: HttpClient
  ) { }

  getAll(){
    let url = this.url;
    return this._http.get(url);
  };

  getById(id: number){
    let url = this.url + id;
    return this._http.get(url);
  };

  save(data: any){
    let url = this.url + "save";
    return this._http.post(url, data);
  };

  delete(id: number){
    let url = this.url + id;
    return this._http.delete(url);
  };

}
