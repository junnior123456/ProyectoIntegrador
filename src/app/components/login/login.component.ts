import { AuthService } from './../../services/auth.service';
import { isLogged } from './../globals';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = "";
  password = "";
  isLogged = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogged = isLogged;
  }

  login(){
    if(this.usuario == "" || this.password == ""){
      Swal.fire({
        title: '¡Error!',
        text: 'Complete los campos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else{
      if(this.usuario == "admin" && this.password == "12345"){
        this.isLogged = true;
        Swal.fire({
          title: '¡Listo!',
          text: 'Login exitoso.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.authService.changeAuthenticated(true);
        this.router.navigate(['/dashboard']);
      }else{
        this.isLogged = false;
        Swal.fire({
          title: '¡Error!',
          text: 'Credenciales incorrectas.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    }
  }

}
