import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  private url = "http://localhost:8080/api/inscripcion/";

  constructor(
    private _http: HttpClient
  ) { }

  getAll(){
    let url = this.url;
    return this._http.get(url);
  };

  getCantidad(){
    let url = this.url + "/cantidad";
    return this._http.get(url);
  };

  getById(id: number){
    let url = this.url + id;
    return this._http.get(url);
  };

  isInscrito(idp: number, idt: number){
    let url = this.url + "persona/" + idp + "/taller/" + idt;
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

  deleteInscripcionByPersonaTaller(idP: number, idT: number){
    let url = this.url + "delete/persona/"+idP+"/taller/"+idT;
    return this._http.get(url);
  };
}
