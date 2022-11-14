import { DatePipe } from '@angular/common';
import { Programa } from './../programas/programa';

export class Taller {
    id: number;
    tema: string;
    fecha: any;
    lugar: string;
    direccion: string;
    programa!: Programa;

    constructor(){
        this.id = 0,
        this.tema = "",
        this.fecha = new Date();
        this.lugar = "";
        this.direccion = "";
    }
}