import { AsistenciaService } from './../../services/asistencia.service';
import { SesionService } from './../../services/sesion.service';
import { InscripcionService } from './../../services/inscripcion.service';
import { TallerService } from './../../services/taller.service';
import { Inscripcion } from './inscripcion';
import { PersonaService } from './../../services/persona.service';
import { personasJSON } from './../globals';
import { Component, OnInit } from '@angular/core';
import { NgbModalOptions, NgbModal, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from './persona';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

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

  lstTalleres!: any[];
  lstSesiones!: any[];
  newInscripcion: Inscripcion = new Inscripcion();

  modelFecha!: NgbDateStruct;
  date!: { year: number; month: number };
  datepipe: DatePipe = new DatePipe('en-US')
  today: any = new Date();

  constructor(private modalService: NgbModal,
    private personaService: PersonaService,
    private calendar: NgbCalendar,
    private tallerService: TallerService,
    private inscripcionService: InscripcionService,
    private sesionService: SesionService,
    private asistenciaService: AsistenciaService) { }

  ngOnInit(): void {
    this.getPersonas();
    this.getTalleres();
    this.today = { year: this.today.getFullYear(), month: this.today.getMonth(), day: this.today.getDay() };
    this.modelFecha = this.calendar.getToday();
    //this.lstPersonas = personasJSON;
  }

  getPersonas(){
    this.personaService.getAll().subscribe( (response: any) => {
      if(response.success){
        this.lstPersonas = response.data;
      }
    });
  }

  getTalleres(){
    this.tallerService.getAll().subscribe( (response: any) => {
      if(response.success){
        this.lstTalleres = response.data;
      }
    });
  }

  open(content: any, type?: string) {
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

      var json;

      if(this.newPersona.id == 0){
        //new
        // if(this.lstPersonas.length > 0){
        //   this.newPersona.id = this.lstPersonas[this.lstPersonas.length-1].id+1;
        // }else{
        //   this.newPersona.id = 1;
        // }
        json = {
          nombres: this.newPersona.nombres,
          paterno: this.newPersona.paterno,
          materno: this.newPersona.materno,
          dni: this.newPersona.dni,
          telefono: this.newPersona.telefono,
          correo: this.newPersona.correo
        }
        
      }else{
        //edit
        //this.lstPersonas[this.lstPersonas.findIndex((obj => obj.id == this.newPersona.id))] = this.newPersona;

        json = {
          id: this.newPersona.id,
          nombres: this.newPersona.nombres,
          paterno: this.newPersona.paterno,
          materno: this.newPersona.materno,
          dni: this.newPersona.dni,
          telefono: this.newPersona.telefono,
          correo: this.newPersona.correo
        }
      }

      this.personaService.save(json).subscribe( (response: any) => {
        if(response.id != null){
          Swal.fire({
            title: '¡Listo!',
            text: 'Persona guardada correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.getPersonas();
        }else{
          Swal.fire({
            title: '¡Error!',
            text: 'Error al guardar persona.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      })

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
    }else if(this.newPersona.correo == "" || this.newPersona.correo == null){
      Swal.fire({
        title: '¡Error!',
        text: 'Ingrese el correo de la persona.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else{
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
    this.newPersona.correo = this.lstPersonas[indx].correo;
  }

  inscripcion(id: number){
    this.newPersona = new Persona();
    this.newInscripcion = new Inscripcion();
    var indx = this.lstPersonas.findIndex((obj => obj.id == id));
    this.newInscripcion.persona.id = this.lstPersonas[indx].id;
    this.newInscripcion.persona.nombres = this.lstPersonas[indx].nombres;
    this.newInscripcion.persona.paterno = this.lstPersonas[indx].paterno;
    this.newInscripcion.persona.materno = this.lstPersonas[indx].materno;
    this.newInscripcion.persona.dni = this.lstPersonas[indx].dni;
    this.newInscripcion.persona.telefono = this.lstPersonas[indx].telefono;
    this.newInscripcion.persona.correo = this.lstPersonas[indx].correo;
  }

  deleteInscripcion(){
    this.inscripcionService.isInscrito(this.newInscripcion.persona.id, this.newInscripcion.taller.id).subscribe( (response: any) => {
      if(response){
        if(this.validarCampos2()){

          var json;
  
          this.inscripcionService.deleteInscripcionByPersonaTaller(this.newInscripcion.persona.id, this.newInscripcion.taller.id).subscribe( (response: any) => {
            
            this.asistenciaService.deleteByPersonaTaller(this.newInscripcion.persona.id, this.newInscripcion.taller.id).subscribe( (response: any) => {
              Swal.fire({
                title: '¡Listo!',
                text: 'Inscripción eliminada correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              this.getPersonas();
              
              this.newPersona = new Persona();
              this.newInscripcion = new Inscripcion();
              this.modalService.dismissAll();
            });
          });
    
          
        }
        
      }else{
        Swal.fire({
          title: '¡Error!',
          text: 'Esta persona no está inscrita en este taller.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });
    
  }

  validarCampos2(): boolean{
    var check = false;
    if(this.newInscripcion.persona.id == 0 || this.newInscripcion.persona.id == null){
      Swal.fire({
        title: '¡Error!',
        text: 'Seleccione la persona a inscribir.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else if(this.newInscripcion.taller.id == 0 || this.newInscripcion.taller.id == null){
      Swal.fire({
        title: '¡Error!',
        text: 'Seleccione el taller a inscribir.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else{
      check = true;
    }
    return check;
  }

  getSesionesByTallerIdSave(idt: number, idp: number){
    this.sesionService.getByTallerId(idt).subscribe( (response: any) => {
      if(response.success){
        this.lstSesiones = response.data;
        if(this.lstSesiones.length > 0){
          this.asistenciaService.saveSesionPersona(this.lstSesiones, idp).subscribe( (response: any) => {
            if(response.length == 0){
              console.log("Error al guardar Asistencias default");
            }
          });
        }
      }
    });
  }

  saveInscripcion(){
    this.inscripcionService.isInscrito(this.newInscripcion.persona.id, this.newInscripcion.taller.id).subscribe( (response: any) => {
      if(response){
        Swal.fire({
          title: '¡Error!',
          text: 'Esta persona ya está inscrita en este taller.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }else{
        if(this.validarCampos2()){

          var json;
    
          if(this.newPersona.id == 0){
            //new
            // if(this.lstPersonas.length > 0){
            //   this.newPersona.id = this.lstPersonas[this.lstPersonas.length-1].id+1;
            // }else{
            //   this.newPersona.id = 1;
            // }
            this.newInscripcion.fecha = this.datepipe.transform(new Date(this.modelFecha.year, this.modelFecha.month-1, this.modelFecha.day+1), 'YYYY-MM-dd');
            json = {
              fecha: this.newInscripcion.fecha,
              persona: {
                id: this.newInscripcion.persona.id
              },
              taller: {
                id: this.newInscripcion.taller.id
              }
            }
            
          }else{
            //edit
            //this.lstPersonas[this.lstPersonas.findIndex((obj => obj.id == this.newPersona.id))] = this.newPersona;
    
            this.newInscripcion.fecha = this.datepipe.transform(new Date(this.modelFecha.year, this.modelFecha.month-1, this.modelFecha.day+1), 'YYYY-MM-dd');
            json = {
              id: this.newInscripcion.id,
              fecha: this.newInscripcion.fecha,
              persona: {
                id: this.newInscripcion.persona.id
              },
              taller: {
                id: this.newInscripcion.taller.id
              }
            }
          }
    
          this.inscripcionService.save(json).subscribe( (response: any) => {
            if(response.id != null){
              Swal.fire({
                title: '¡Listo!',
                text: 'Inscripción registrada correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              this.getPersonas();
              this.getSesionesByTallerIdSave(this.newInscripcion.taller.id, this.newInscripcion.persona.id);
              
              this.newPersona = new Persona();
              this.newInscripcion = new Inscripcion();
              this.modalService.dismissAll();
            }else{
              Swal.fire({
                title: '¡Error!',
                text: 'Error al registrar inscripción.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })
            }
          });
    
          
        }
      }
    });
    
  }

  eliminar(id: number){
    this.newPersona = new Persona();
    // var indx = this.lstPersonas.findIndex((obj => obj.id == id));
    // this.lstPersonas.splice(indx, 1);
    this.personaService.delete(id).subscribe( (response: any) => {
      if(response.success){
        Swal.fire({
          title: '¡Listo!',
          text: 'Persona eliminada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.getPersonas();
      }else{
        Swal.fire({
          title: '¡Error!',
          text: 'Error al eliminar persona.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      };
    });
  }

  clear(){
    this.newPersona = new Persona();
  }

}
