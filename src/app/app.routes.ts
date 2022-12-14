import { AuthGuard } from './auth/auth.guard';
import { Routes, RouterModule } from "@angular/router";
import {  Provider, Type } from "@angular/core";

export const routes: Routes = [
    { path: 'login',  loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)},
    { path: 'home',  loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)},
    { path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)},
    { path: 'programas', canActivate: [AuthGuard], loadChildren: () => import('./components/programas/programas.module').then(m => m.ProgramasModule)},
    { path: 'talleres', canActivate: [AuthGuard], loadChildren: () => import('./components/talleres/talleres.module').then(m => m.TalleresModule)},
    { path: 'personas', canActivate: [AuthGuard], loadChildren: () => import('./components/personas/personas.module').then(m => m.PersonasModule)},

    { path: '**', redirectTo: 'home' }
]
// esto es ruta publicas 
export const routing = RouterModule.forRoot(routes);