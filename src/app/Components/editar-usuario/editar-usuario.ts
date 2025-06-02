import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../Entidad/Usuario';
import { Rol } from '../../../Entidad/Rol';
import { Ws } from '../../Service/ws';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-usuario',
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-usuario.html',
  styleUrl: './editar-usuario.css',
})
export class EditarUsuario implements OnInit {
  usuario = new Usuario();
  roles: Rol[] = [];
  esMayorDeEdad: boolean = true;
  fechaString: string = '';

  constructor(private service: Ws, private router: Router) {}

  ngOnInit(): void {
    this.buscar();
    this.getRoles();

    setTimeout(() => {
      this.roles.forEach((c) => {
        if (c.id == this.usuario.rolId.id) {
          this.usuario.rolId = c;
        }
      });
      this.fechaString = this.formatFecha(this.usuario.fechaNacimiento);
    }, 500);
  }

  formatFecha(fecha: Date): string {
    const date = new Date(fecha);
    const anio = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');
    return anio + '-' + mes + '-' + dia;
  }

  stringAFecha(fecha: string): Date {
    const [anio, mes, dia] = fecha.split('-').map(Number);
    return new Date(anio, mes - 1, dia);
  }

  buscar() {
    this.usuario.id = Number(localStorage.getItem('id'));
    this.service.buscarUsuario(this.usuario).subscribe((data) => {
      this.usuario = data;
    });
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
        apellidoLimpio +
        '@ENUCOM.COM.MX'.split(' ').join('');
      this.usuario.correo;
    } else {
      this.usuario.correo = '';
    }
  }

  calcularEdad(): void {
    if (!this.usuario.fechaNacimiento) {
      this.esMayorDeEdad = false;
      return;
    }

    const nacimiento = new Date(this.fechaString);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    this.esMayorDeEdad = edad >= 18;
  }

  validacionCaracteres(event: KeyboardEvent): void {
    const key = event.key;
    // Expresión regular: solo letras a-z (mayúsculas o minúsculas) y espacios.
    const soloLetras = /^[a-zA-Z\s]+$/;

    if (!soloLetras.test(key)) {
      event.preventDefault();
    }
  }

  guardar() {
    this.usuario.fechaNacimiento = this.stringAFecha(this.fechaString);
    this.service.editarUsuario(this.usuario).subscribe(
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
