import { Sesion } from './Sesion';
import { Persona } from '../personas/persona';

export class Asistencia {
    id: number;
    sesion: Sesion;
    persona: Persona;

    constructor(){
        this.id = 0,
        this.sesion = new Sesion();
        this.persona = new Persona();
    }
}