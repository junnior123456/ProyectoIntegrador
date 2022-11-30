import { Routes, RouterModule } from "@angular/router";
import {  Provider, Type } from "@angular/core";

export const routes: Routes = [
    { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)},
    { path: 'programas', loadChildren: () => import('./components/programas/programas.module').then(m => m.ProgramasModule)},
    { path: 'talleres', loadChildren: () => import('./components/talleres/talleres.module').then(m => m.TalleresModule)},
    { path: 'personas', loadChildren: () => import('./components/personas/personas.module').then(m => m.PersonasModule)},

    { path: '**', redirectTo: 'home' }
]
// esto es ruta publicas 
export const routing = RouterModule.forRoot(routes);