import { ProgramasComponent } from './../programas/programas.component';
import { Component, Input, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Taller } from './taller';
import { programasJSON, talleresJSON } from '../globals';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.component.html',
  styleUrls: ['./talleres.component.css']
})
export class TalleresComponent implements OnInit {

  lstTallers!: any[];
  newTaller: Taller = new Taller();
  modelFecha!: NgbDateStruct;
  date!: { year: number; month: number };
  datepipe: DatePipe = new DatePipe('en-US')
  modalOption: NgbModalOptions = {}; // not null!

  lblTaller = "Nuevo Taller";
  lblButtonTaller = "Guardar";
  
  lstProgramas: any[];

  constructor(private modalService: NgbModal, private calendar: NgbCalendar, private programasComponent: ProgramasComponent) {
    this.lstProgramas = programasComponent.lstProgramas;
  }

  ngOnInit(): void {
    this.lstTallers = talleresJSON;
    this.lstProgramas = programasJSON;
  }

  open(content: any, type: string) {
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

  save(){
    if(this.newTaller.id == 0){
      //new
      if(this.lstTallers.length > 0){
        this.newTaller.id = this.lstTallers[this.lstTallers.length-1].id+1;
      }else{
        this.newTaller.id = 1;
      }
      this.newTaller.fecha = this.datepipe.transform(new Date(this.modelFecha.year, this.modelFecha.month-1, this.modelFecha.day), 'dd/MM/YYYY');
      this.newTaller.programa = this.lstProgramas[this.lstProgramas.findIndex((obj => obj.id == this.newTaller.programa))];
      this.lstTallers.push(this.newTaller);
    }else{
      //edit
      this.newTaller.fecha = this.datepipe.transform(new Date(this.modelFecha.year, this.modelFecha.month-1, this.modelFecha.day), 'dd/MM/YYYY');
      this.lstTallers[this.lstTallers.findIndex((obj => obj.id == this.newTaller.id))] = this.newTaller;
    }
    this.newTaller = new Taller();
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
  }

  eliminar(id: number){
    this.newTaller = new Taller();
    var indx = this.lstTallers.findIndex((obj => obj.id == id));
    this.lstTallers.splice(indx, 1);
  }

  clear(){
    this.newTaller = new Taller();
  }

}
