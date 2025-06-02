import { Component, OnInit } from '@angular/core';
import { Ws } from '../../Service/ws';
import { Router } from '@angular/router';
import { Rol } from '../../../Entidad/Rol';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-rol',
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-rol.html',
  styleUrl: './editar-rol.css',
})
export class EditarRol implements OnInit {
  constructor(private service: Ws, private router: Router) {}
  rol = new Rol();
  roles: Rol[] = [];
  existe: boolean = false;

  ngOnInit(): void {
    this.getRoles();
    this.buscar();
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

  buscar() {
    this.rol.id = Number(localStorage.getItem('id'));
    console.log(localStorage.getItem('id'));
    this.service.buscarRoles(this.rol).subscribe((data) => {
      console.log(JSON.stringify(data));
      this.rol = data;
    });
  }

  editar() {
    this.service.editarRoles(this.rol).subscribe((data) => {
      Swal.fire({
        title: 'Editar',
        text: JSON.stringify(data),
        showConfirmButton: false,
        timer: 3500,
        icon: 'success',
      });
      this.router.navigate(['roles']);
    });
  }
}
