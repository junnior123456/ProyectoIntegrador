import { Taller } from './../talleres/taller';

export class Sesion {
    id: number;
    nombre: string;
    taller: Taller;

    constructor(){
        this.id = 0;
        this.nombre = "";
        this.taller = new Taller();
    }
}