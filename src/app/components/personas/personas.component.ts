import { personasJSON } from './../globals';
import { Component, OnInit } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from './persona';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  lstPersonas!: any[];
  newPersona: Persona = new Persona();
  modalOption: NgbModalOptions = {}; // not null!
  lblPersona = "Nueva Persona";
  lblButtonPersona = "Guardar";

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.lstPersonas = personasJSON;
  }

  open(content: any, type: string) {
    switch (type) {
      case "new":
        this.lblPersona = "Nueva Persona";
        this.lblButtonPersona = "Guardar";
        break;
      case "edit":
        this.lblPersona = "Editar Persona";
        this.lblButtonPersona = "Editar";
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
    if(this.validarCampos()){
      if(this.newPersona.id == 0){
        //new
        if(this.lstPersonas.length > 0){
          this.newPersona.id = this.lstPersonas[this.lstPersonas.length-1].id+1;
        }else{
          this.newPersona.id = 1;
        }
        this.lstPersonas.push(this.newPersona);
      }else{
        //edit
        this.lstPersonas[this.lstPersonas.findIndex((obj => obj.id == this.newPersona.id))] = this.newPersona;
      }
      this.newPersona = new Persona();
      this.modalService.dismissAll();
    }
  }

  validarCampos(): boolean{
    var check = false;
    if(this.newPersona.nombres == "" || this.newPersona.nombres == null){
      Swal.fire({
        title: '¡Error!',
        text: 'Ingrese los nombres de la persona.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else if(this.newPersona.paterno == "" || this.newPersona.paterno == null){
      Swal.fire({
        title: '¡Error!',
        text: 'Ingrese el apellido paterno de la persona.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else if(this.newPersona.materno == "" || this.newPersona.materno == null){
      Swal.fire({
        title: '¡Error!',
        text: 'Ingrese el apellido materno de la persona.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else if(this.newPersona.dni == "" || this.newPersona.dni == null){
      Swal.fire({
        title: '¡Error!',
        text: 'Ingrese el DNI de la persona.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else if(this.newPersona.telefono == "" || this.newPersona.telefono == null){
      Swal.fire({
        title: '¡Error!',
        text: 'Ingrese el telefono de la persona.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else{
      Swal.fire({
        title: '¡Listo!',
        text: 'Persona creada correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      check = true;
    }
    return check;
  }

  editar(id: number){
    this.newPersona = new Persona();
    var indx = this.lstPersonas.findIndex((obj => obj.id == id));
    console.log(this.lstPersonas[indx]);
    this.newPersona.id = this.lstPersonas[indx].id;
    this.newPersona.nombres = this.lstPersonas[indx].nombres;
    this.newPersona.paterno = this.lstPersonas[indx].paterno;
    this.newPersona.materno = this.lstPersonas[indx].materno;
    this.newPersona.dni = this.lstPersonas[indx].dni;
    this.newPersona.telefono = this.lstPersonas[indx].telefono;
  }

  eliminar(id: number){
    this.newPersona = new Persona();
    var indx = this.lstPersonas.findIndex((obj => obj.id == id));
    this.lstPersonas.splice(indx, 1);
  }

  clear(){
    this.newPersona = new Persona();
  }

}
