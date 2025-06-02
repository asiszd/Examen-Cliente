import { Component, OnInit } from '@angular/core';
import { Ws } from '../../Service/ws';
import { Router } from '@angular/router';
import { Rol } from '../../../Entidad/Rol';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nuevo-rol',
  imports: [FormsModule, CommonModule],
  templateUrl: './nuevo-rol.html',
  styleUrl: './nuevo-rol.css',
})
export class NuevoRol implements OnInit {
  constructor(private service: Ws, private router: Router) {}

  rol = new Rol();
  roles: Rol[] = [];
  existe: boolean = false;

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.service.listarRoles().subscribe((respuesta) => {
      this.roles = respuesta;
    });
  }

  validarRol() {
    this.existe = this.roles.some((r) => {
      if (r.privilegio == this.rol.privilegio) {
        return true;
      }
      return false;
    });
  }

  guardar() {
    this.service.guardarRoles(this.rol).subscribe(
      (data) => {
        Swal.fire({
          title: 'Guardado!',
          icon: 'success',
          text: JSON.stringify(data),
          showConfirmButton: false,
          timer: 3500,
        });
        this.router.navigate(['roles']);
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
