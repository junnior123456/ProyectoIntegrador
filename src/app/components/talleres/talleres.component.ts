import { SesionService } from './../../services/sesion.service';
import { ProgramaService } from './../../services/programa.service';
import { TallerService } from './../../services/taller.service';
import { ProgramasComponent } from './../programas/programas.component';
import { Component, Input, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct, NgbInputDatepickerConfig, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Taller } from './taller';
import { programasJSON, talleresJSON } from '../globals';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Asistencia } from './asistencia';
import { AsistenciaService } from 'src/app/services/asistencia.service';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css'],
  providers: [NgbInputDatepickerConfig]
})
export class TalleresComponent implements OnInit {

  lstTallers!: any[];
  newTaller: Taller = new Taller();
  newAsistencia: Asistencia = new Asistencia();
  modelFecha!: NgbDateStruct;
  date!: { year: number; month: number };
  datepipe: DatePipe = new DatePipe('en-US')
  modalOption: NgbModalOptions = {}; // not null!
  today: any = new Date();

  lblTaller = "Nuevo Taller";
  lblButtonTaller = "Guardar";
  
  lstProgramas: any[];
  lstSesiones!: any[];
  lstAsistencias!: any[];

  constructor(private modalService: NgbModal,
    private calendar: NgbCalendar,
    private programasComponent: ProgramasComponent,
    private tallerService: TallerService,
    private programaService: ProgramaService,
    private sesionService: SesionService,
    private asistenciaService: AsistenciaService) {
    this.lstProgramas = programasComponent.lstProgramas;
  }

  ngOnInit(): void {
    //this.lstTallers = talleresJSON;
    this.getProgramas();
    this.getTalleres();
    //this.lstProgramas = programasJSON;
    this.today = { year: this.today.getFullYear(), month: this.today.getMonth(), day: this.today.getDay() };
    this.modelFecha = this.calendar.getToday();
  }

  getTalleres(){
    this.tallerService.getAll().subscribe( (response: any) => {
      if(response.success){
        this.lstTallers = response.data;
      }
    });
  }

  getProgramas(){
    this.programaService.getAll().subscribe( (response: any) => {
      if(response.success){
        this.lstProgramas = response.data;
      }
    });
  }

  getSesionesByTallerId(id: number){
    this.sesionService.getByTallerId(id).subscribe( (response: any) => {
      if(response.success){
        this.lstSesiones = response.data;
      }
    });
  }

  changeSesion(){
    if(this.newAsistencia.sesion.id != 0){
      this.getAsistenciasBySesionId(this.newAsistencia.sesion.id);
    }
  }

  getAsistenciasBySesionId(id: number){
    this.asistenciaService.getBySesionId(id).subscribe( (response: any) => {
      if(response.success){
        this.lstAsistencias = response.data;
        if(this.lstAsistencias.length == 0){
          Swal.fire({
            title: '¡Error!',
            text: 'Este taller no tiene personas inscritas, por favor realice inscripciones.',
            icon: 'error',
            confirmButtonText: 'Ir a "Personas"'
          }).then((result) => {
            if (result.value) {
              window.location.href = `/personas`
            }
          }); 
        }
      }
    });
  }

  toggleAsistencia(popover: any, id: number) {
		if (popover.isOpen()) {
			popover.close();
		} else {
			popover.open({ id });
		}
	}

  tempChangeAsistencia(id: number, tipo: number){
    switch (tipo) {
      case 0:
        this.lstAsistencias[this.lstAsistencias.findIndex((obj => obj.id == id))].estado = 0;
        break;
      case 1:
        this.lstAsistencias[this.lstAsistencias.findIndex((obj => obj.id == id))].estado = 1;
        break;
      case 2:
        this.lstAsistencias[this.lstAsistencias.findIndex((obj => obj.id == id))].estado = 2;
        break;

      default:
        break;
    }
  }

  validarCampos2(): boolean{
    var check = false;
    if(this.newAsistencia.sesion.id == 0 || this.newAsistencia.sesion.id == null){
      Swal.fire({
        title: '¡Error!',
        text: 'Elija una sesión para tomar asistencia.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else{
      check = true;
    }
    return check;
  }

  saveAsistencia(){
    if(this.validarCampos2()){

      var arrayJson = [];

      for (let i = 0; i < this.lstAsistencias.length; i++) {
        
        var json = {
          id: this.lstAsistencias[i].id,
          estado: this.lstAsistencias[i].estado,
          sesion: {
            id: this.lstAsistencias[i].sesion.id
          },
          persona: {
            id: this.lstAsistencias[i].persona.id
          }
        }

        arrayJson.push(json);
      }

      this.asistenciaService.saveMany(arrayJson).subscribe( (response: any) => {
        if(response.length > 0){  
          Swal.fire({
            title: '¡Listo!',
            text: 'Asistencia guardada correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.newAsistencia = new Asistencia();
          this.lstAsistencias = [];
          this.modalService.dismissAll();
        }else{
          Swal.fire({
            title: '¡Error!',
            text: 'Error al guardar asistencia.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      });

    }
  }

  open(content: any, type?: string) {
    switch (type) {
      case "new":
        this.lblTaller = "Nuevo Taller";
        this.lblButtonTaller = "Guardar";
        break;
      case "edit":
        this.lblTaller = "Editar Taller";
        this.lblButtonTaller = "Editar";
        break;
      default:
        break;
    }
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.ariaLabelledBy = 'modal-basic-title';
		this.modalService.open(content, this.modalOption);
	}

  validarCampos(): boolean{
    var check = false;
    if(this.newTaller.tema == "" || this.newTaller.tema == null){
      Swal.fire({
        title: '¡Error!',
        text: 'Ingrese un tema para el taller.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else if(this.newTaller.fecha == "" || this.newTaller.fecha == null || this.newTaller.fecha == undefined || (document.querySelector('#fecha') as HTMLInputElement).value == ""){
      Swal.fire({
        title: '¡Error!',
        text: 'Ingrese una fecha para el taller.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else if(this.newTaller.lugar == "" || this.newTaller.lugar == null){
      Swal.fire({
        title: '¡Error!',
        text: 'Ingrese un lugar para el taller.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else if(this.newTaller.direccion == "" || this.newTaller.direccion == null){
      Swal.fire({
        title: '¡Error!',
        text: 'Ingrese una dirección para el taller.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else if(this.newTaller.programa == undefined || this.newTaller.programa == null || this.newTaller.programa.id == 0){
      Swal.fire({
        title: '¡Error!',
        text: 'Ingrese un programa para el taller.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else{
      check = true;
    }
    return check;
  }

  save4Default(idTaller: number){
    this.sesionService.save4Default(idTaller).subscribe( (response: any) => {
      if(response.length == 0){
        Swal.fire({
          title: '¡Error!',
          text: 'Error al guardar sesiones.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }

  save(){
    if(this.validarCampos()){

      var json;

      if(this.newTaller.id == 0){
        //new
        // if(this.lstTallers.length > 0){
        //   this.newTaller.id = this.lstTallers[this.lstTallers.length-1].id+1;
        // }else{
        //   this.newTaller.id = 1;
        // }
        this.newTaller.fecha = this.datepipe.transform(new Date(this.modelFecha.year, this.modelFecha.month-1, this.modelFecha.day), 'YYYY-MM-dd');
        this.newTaller.programa = this.lstProgramas[this.lstProgramas.findIndex((obj => obj.id == this.newTaller.programa.id))];
        // this.lstTallers.push(this.newTaller);
        // console.log(this.newTaller);

        json = {
          tema: this.newTaller.tema,
          fecha: this.newTaller.fecha,
          lugar: this.newTaller.lugar,
          direccion: this.newTaller.direccion,
          programa: {
            id: this.newTaller.programa.id
          }
        }
      }else{
        //edit
        this.newTaller.fecha = this.datepipe.transform(new Date(this.modelFecha.year, this.modelFecha.month-1, this.modelFecha.day), 'YYYY-MM-dd');
        this.newTaller.programa = this.lstProgramas[this.lstProgramas.findIndex((obj => obj.id == this.newTaller.programa.id))];
        // this.lstTallers[this.lstTallers.findIndex((obj => obj.id == this.newTaller.id))] = this.newTaller;
        json = {
          id: this.newTaller.id,
          tema: this.newTaller.tema,
          fecha: this.newTaller.fecha,
          lugar: this.newTaller.lugar,
          direccion: this.newTaller.direccion,
          programa: {
            id: this.newTaller.programa.id
          }
        }
      }

      this.tallerService.save(json).subscribe( (response: any) => {
        if(response.id != null){
          this.save4Default(response.id);
          Swal.fire({
            title: '¡Listo!',
            text: 'Taller guardado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.getProgramas();
          this.getTalleres();
          this.newTaller = new Taller();
          this.modalService.dismissAll();
        }else{
          Swal.fire({
            title: '¡Error!',
            text: 'Error al guardar taller.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      });
    }
  }

  editar(id: number){
    this.newTaller = new Taller();
    var indx = this.lstTallers.findIndex((obj => obj.id == id));
    this.newTaller.id = this.lstTallers[indx].id;
    this.newTaller.tema = this.lstTallers[indx].tema;
    this.newTaller.fecha = this.lstTallers[indx].fecha;
    this.newTaller.lugar = this.lstTallers[indx].lugar;
    this.newTaller.direccion = this.lstTallers[indx].direccion;
    this.newTaller.programa = this.lstTallers[indx].programa;
    this.newTaller.programa.id = this.lstTallers[indx].programa.id;
    this.newTaller.programa.descripcion = this.lstTallers[indx].programa.descripcion;
    this.newTaller.programa.nombre = this.lstTallers[indx].programa.nombre;
    
    console.log(this.newTaller.fecha);
    this.modelFecha = {year: +this.newTaller.fecha.slice(0,4), month: +this.newTaller.fecha.slice(5,7), day: +this.newTaller.fecha.slice(8,10)}
  }

  asistencia(id: number){
    this.newTaller = new Taller();
    var indx = this.lstTallers.findIndex((obj => obj.id == id));
    this.newTaller.id = this.lstTallers[indx].id;
    this.newTaller.tema = this.lstTallers[indx].tema;
    this.newTaller.fecha = this.lstTallers[indx].fecha;
    this.newTaller.lugar = this.lstTallers[indx].lugar;
    this.newTaller.direccion = this.lstTallers[indx].direccion;
    this.newTaller.programa = this.lstTallers[indx].programa;
    this.newTaller.programa.id = this.lstTallers[indx].programa.id;
    this.newTaller.programa.descripcion = this.lstTallers[indx].programa.descripcion;
    this.newTaller.programa.nombre = this.lstTallers[indx].programa.nombre;

    this.getSesionesByTallerId(id);
    
    console.log(this.newTaller.fecha);
    this.modelFecha = {year: +this.newTaller.fecha.slice(0,4), month: +this.newTaller.fecha.slice(5,7), day: +this.newTaller.fecha.slice(8,10)}
  }

  eliminar(id: number){
    this.newTaller = new Taller();
    // var indx = this.lstTallers.findIndex((obj => obj.id == id));
    // this.lstTallers.splice(indx, 1);
    this.tallerService.delete(id).subscribe( (response: any) => {
      if(response.success){
        Swal.fire({
          title: '¡Listo!',
          text: 'Taller eliminado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.getProgramas();
      }else{
        Swal.fire({
          title: '¡Error!',
          text: 'Error al eliminar taller.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      };
    });
  }

  clear(){
    this.newTaller = new Taller();
    this.modelFecha = this.calendar.getToday();
    this.newAsistencia = new Asistencia();
    this.lstAsistencias = [];
  }

}
