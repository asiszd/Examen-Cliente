import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../Entidad/Usuario';
import { CommonModule } from '@angular/common';
import { Ws } from '../../Service/ws';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuario',
  imports: [CommonModule],
  templateUrl: './listar-usuario.html',
  styleUrl: './listar-usuario.css',
})
export class ListarUsuario implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private service: Ws, private router: Router) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listarUsuario().subscribe((respuesta) => {
      this.usuarios = respuesta;
    });
  }

  nuevo() {
    this.router.navigate(['nuevoUsuario']);
  }

  editar(id: number) {
    localStorage.setItem('id', id.toString());
    this.router.navigate(['editarUsuario']);
  }

  eliminar(usuario: Usuario) {
    Swal.fire({
      title:
        '¿Desea eliminar al usuario <b>' +
        usuario.nombre +
        ' ' +
        usuario.app +
        ' ' +
        usuario.apm +
        '</b>?',
      text: 'Esta acción no se podrá revertir',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarUsuario(usuario).subscribe(
          (data) => {
            Swal.fire({
              title:
                'Se ha eliminado al usuario ' +
                usuario.nombre +
                ' ' +
                usuario.app +
                ' ' +
                usuario.apm +
                ' correctamente!',
              icon: 'success',
              timer: 3500,
            });
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['usuarios']);
              });
          },
          (error) => {
            Swal.fire({
              title: 'Ocurrió un error!',
              icon: 'error',
              text:
                'El usuario ' +
                usuario.nombre +
                ' ' +
                usuario.app +
                ' ' +
                usuario.apm +
                ' no se ha podido eliminar!',
              showConfirmButton: false,
              timer: 4500,
            });
          }
        );
      }
    });
  }
}
