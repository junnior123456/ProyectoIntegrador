import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Programa } from './programa';
import {programasJSON} from '../globals';

@Component({
  selector: 'app-programas',
  templateUrl: './programas.component.html',
  styleUrls: ['./programas.component.css']
})
export class ProgramasComponent implements OnInit {

  lstProgramas!: any[];
  newPrograma: Programa = new Programa();
  modalOption: NgbModalOptions = {}; // not null!
  lblPrograma = "Nuevo Programa";
  lblButtonPrograma = "Guardar";

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.lstProgramas = programasJSON;
  }

  open(content: any, type: string) {
    switch (type) {
      case "new":
        this.lblPrograma = "Nuevo Programa";
        this.lblButtonPrograma = "Guardar";
        break;
      case "edit":
        this.lblPrograma = "Editar Programa";
        this.lblButtonPrograma = "Editar";
        break;
      default:
        break;
    }
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.ariaLabelledBy = 'modal-basic-title';
		this.modalService.open(content, this.modalOption);
	}

  save(){
    if(this.newPrograma.id == 0){
      //new
      if(this.lstProgramas.length > 0){
        this.newPrograma.id = this.lstProgramas[this.lstProgramas.length-1].id+1;
      }else{
        this.newPrograma.id = 1;
      }
      this.lstProgramas.push(this.newPrograma);
    }else{
      //edit
      this.lstProgramas[this.lstProgramas.findIndex((obj => obj.id == this.newPrograma.id))] = this.newPrograma;
    }
    this.newPrograma = new Programa();
  }

  editar(id: number){
    this.newPrograma = new Programa();
    var indx = this.lstProgramas.findIndex((obj => obj.id == id));
    this.newPrograma.id = this.lstProgramas[indx].id;
    this.newPrograma.nombre = this.lstProgramas[indx].nombre;
    this.newPrograma.descripcion = this.lstProgramas[indx].descripcion;
  }

  eliminar(id: number){
    this.newPrograma = new Programa();
    var indx = this.lstProgramas.findIndex((obj => obj.id == id));
    this.lstProgramas.splice(indx, 1);
  }

  clear(){
    this.newPrograma = new Programa();
  }

}
