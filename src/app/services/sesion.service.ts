import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private url = "http://localhost:8080/api/sesion/";

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

  getByTallerId(id: number){
    let url = this.url + "taller/" +id;
    return this._http.get(url);
  }

  save(data: any){
    let url = this.url + "save";
    return this._http.post(url, data);
  };

  save4Default(idt: number){
    let url = this.url + "save4Default/taller/"+idt;
    return this._http.get(url);
  };

  delete(id: number){
    let url = this.url + id;
    return this._http.delete(url);
  };
}
