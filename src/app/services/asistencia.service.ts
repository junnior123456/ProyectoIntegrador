import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  private url = "http://localhost:8080/api/asistencia/";

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

  getBySesionId(id: number){
    let url = this.url + "sesion/" + id;
    return this._http.get(url);
  };

  getEstadosByTaller(){
    let url = this.url + "taller/estado";
    return this._http.get(url);
  }

  save(data: any){
    let url = this.url + "save";
    return this._http.post(url, data);
  };

  saveMany(data: any){
    let url = this.url + "saveMany";
    return this._http.post(url, data);
  };

  saveSesionPersona(data: any, idp: number){
    let url = this.url + "save/persona/" + idp;
    return this._http.post(url, data);
  };

  delete(id: number){
    let url = this.url + id;
    return this._http.delete(url);
  };
}
