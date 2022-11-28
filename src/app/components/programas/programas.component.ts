import { ProgramaService } from './../../services/programa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Programa } from './programa';
import {programasJSON} from '../globals';
import Swal from 'sweetalert2';

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

  constructor(private modalService: NgbModal, private programaService: ProgramaService) { }

  ngOnInit(): void {
    this.getProgramas();
    //this.lstProgramas = programasJSON;
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
    if(this.validarCampos()){

      var json;
      
      if(this.newPrograma.id == 0){
        //new
        // if(this.lstProgramas.length > 0){
        //   this.newPrograma.id = this.lstProgramas[this.lstProgramas.length-1].id+1;
        // }else{
        //   this.newPrograma.id = 1;
        // }
        // this.lstProgramas.push(this.newPrograma);

        json = {
          nombre: this.newPrograma.nombre,
          descripcion: this.newPrograma.descripcion
        }

      }else{
        //edit
        // this.lstProgramas[this.lstProgramas.findIndex((obj => obj.id == this.newPrograma.id))] = this.newPrograma;
      
        json = {
          id: this.newPrograma.id,
          nombre: this.newPrograma.nombre,
          descripcion: this.newPrograma.descripcion
        }
      
      }

      this.programaService.save(json).subscribe( (response: any) => {
        if(response.id != null){
          Swal.fire({
            title: '¡Listo!',
            text: 'Programa guardado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.getProgramas();
        }else{
          Swal.fire({
            title: '¡Error!',
            text: 'Error al guardar programa.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      })
      this.newPrograma = new Programa();
      this.modalService.dismissAll();
    }
  }

  getProgramas(){
    this.programaService.getAll().subscribe( (response: any) => {
      if(response.success){
        this.lstProgramas = response.data;
      }
    });
  }

  validarCampos(): boolean{
    var check = false;
    if(this.newPrograma.nombre == "" || this.newPrograma.nombre == null){
      Swal.fire({
        title: '¡Error!',
        text: 'Ingrese un nombre para el programa.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else if(this.newPrograma.descripcion == "" || this.newPrograma.descripcion == null){
      Swal.fire({
        title: '¡Error!',
        text: 'Ingrese una descripción para el programa.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else{
      check = true;
    }
    return check;
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
    // var indx = this.lstProgramas.findIndex((obj => obj.id == id));
    // this.lstProgramas.splice(indx, 1);
    this.programaService.delete(id).subscribe( (response: any) => {
      if(response.success){
        Swal.fire({
          title: '¡Listo!',
          text: 'Programa eliminado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.getProgramas();
      }else{
        Swal.fire({
          title: '¡Error!',
          text: 'Error al eliminar programa.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      };
    });
  }

  clear(){
    this.newPrograma = new Programa();
  }

}
