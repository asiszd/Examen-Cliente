import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ws } from '../../Service/ws';
import { Usuario } from '../../../Entidad/Usuario';
import { Rol } from '../../../Entidad/Rol';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nuevo-usuario',
  imports: [FormsModule, CommonModule],
  templateUrl: './nuevo-usuario.html',
  styleUrl: './nuevo-usuario.css',
})
export class NuevoUsuario implements OnInit {
  usuario = new Usuario();
  roles: Rol[] = [];
  esMayorDeEdad: boolean = true;

  constructor(private service: Ws, private router: Router) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.service.listarRoles().subscribe((respuesta) => {
      this.roles = respuesta;
    });
  }

  actualizarCorreo(): void {
    if (this.usuario.nombre && this.usuario.app) {
      const nombreLimpio = this.usuario.nombre.trim().toUpperCase();
      const apellidoLimpio = this.usuario.app.trim().toUpperCase();
      this.usuario.correo =
        nombreLimpio +
        '.' +
        apellidoLimpio.split(' ').join('') +
        '@ENUCOM.COM.MX';
    } else {
      this.usuario.correo = '';
    }
  }

  validacionCaracteres(event: KeyboardEvent): void {
    const key = event.key;
    // Expresión regular: solo letras a-z (mayúsculas o minúsculas) y espacios.
    const soloLetras = /^[a-zA-Z\s]+$/;

    if (!soloLetras.test(key)) {
      event.preventDefault();
    }
  }

  calcularEdad(): void {
    if (!this.usuario.fechaNacimiento) {
      this.esMayorDeEdad = false;
      return;
    }

    const nacimiento = new Date(this.usuario.fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    this.esMayorDeEdad = edad >= 18;
  }

  guardar() {
    this.usuario.fechaCreacion = new Date();

    this.service.guardarUsuario(this.usuario).subscribe(
      (data) => {
        Swal.fire({
          title: 'Guardado!',
          icon: 'success',
          text: JSON.stringify(data),
          showConfirmButton: false,
          timer: 3500,
        });
        this.router.navigate(['usuarios']);
      },
      (error) => {
        Swal.fire({
          title: 'Ocurrió un error!',
          icon: 'error',
          text: JSON.stringify(error.error.mensaje),
          showConfirmButton: false,
          timer: 3500,
        });
      }
    );
  }
}
