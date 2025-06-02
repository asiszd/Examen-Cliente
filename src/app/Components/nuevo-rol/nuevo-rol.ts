import { Component } from '@angular/core';
import { Ws } from '../../Service/ws';
import { Router } from '@angular/router';
import { Rol } from '../../../Entidad/Rol';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevo-rol',
  imports: [FormsModule],
  templateUrl: './nuevo-rol.html',
  styleUrl: './nuevo-rol.css',
})
export class NuevoRol {
  constructor(private service: Ws, private router: Router) {}

  rol = new Rol();

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
