import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../Entidad/Rol';
import { Ws } from '../../Service/ws';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-rol',
  imports: [],
  templateUrl: './listar-rol.html',
  styleUrl: './listar-rol.css',
})
export class ListarRol implements OnInit {
  roles: Rol[] = [];

  constructor(private service: Ws, private router: Router) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listarRoles().subscribe((respuesta) => {
      this.roles = respuesta;
    });
  }

  nuevo() {
    this.router.navigate(['nuevoRol']);
  }

  editar(id: number) {
    localStorage.setItem('id', id.toString());
    this.router.navigate(['editarRol']);
  }

  eliminar(rol: Rol) {
    Swal.fire({
      title: '¿Desea eliminar el Rol <b>' + rol.privilegio + '</b>?',
      text: 'Esta acción no se podrá revertir',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarRoles(rol).subscribe(
          (data) => {
            Swal.fire({
              title:
                'Se ha eliminado el rol ' + rol.privilegio + ' correctamente!',
              icon: 'success',
              timer: 3500,
            });
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['roles']);
              });
          },
          (error) => {
            Swal.fire({
              title: 'Ocurrió un error!',
              icon: 'error',
              text:
                'El rol ' +
                rol.privilegio +
                ' está asignado a uno o mas usuarios, por lo tanto no puede ser eliminado.',
              showConfirmButton: false,
              timer: 4500,
            });
          }
        );
      }
    });
  }
}
