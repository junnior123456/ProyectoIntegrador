import { Taller } from './../talleres/taller';
import { DatePipe } from '@angular/common';
import { Persona } from '../personas/persona';

export class Inscripcion {
    id: number;
    fecha: any;
    taller: Taller;
    persona: Persona;

    constructor(){
        this.id = 0,
        this.fecha = new Date();
        this.taller = new Taller();
        this.persona = new Persona();
    }
}