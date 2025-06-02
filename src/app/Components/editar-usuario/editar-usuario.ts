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
    }, 500);
  }

  buscar() {
    this.usuario.id = Number(localStorage.getItem('id'));
    console.log(localStorage.getItem('id'));
    this.service.buscarUsuario(this.usuario).subscribe((data) => {
      console.log(JSON.stringify(data));
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
        nombreLimpio + '.' + apellidoLimpio + '@ENUCOM.COM.MX';
    } else {
      this.usuario.correo = '';
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
