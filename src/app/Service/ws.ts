import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../../Entidad/Rol';
import { Usuario } from '../../Entidad/Usuario';

@Injectable({
  providedIn: 'root',
})
export class Ws {
  constructor(private http: HttpClient) {}

  //Direcciones de acceso al servidor
  urlRol = 'http://localhost:8030/api/rol';
  urlUsuario = 'http://localhost:8030/api/usuario';

  //CRUD DE ROLES
  listarRoles() {
    return this.http.get<Rol[]>(this.urlRol + '/listar');
  }

  guardarRoles(rol: Rol) {
    return this.http.post<String>(this.urlRol + '/guardar', rol);
  }

  editarRoles(rol: Rol) {
    return this.http.put<String>(this.urlRol + '/editar', rol);
  }

  eliminarRoles(rol: Rol) {
    return this.http.delete<void>(this.urlRol + '/eliminar', {
      body: rol,
    });
  }

  buscarRoles(rol: Rol) {
    return this.http.post<Rol>(this.urlRol + '/buscar', rol);
  }

  //CRUD DE USUARIOS
  listarUsuario() {
    return this.http.get<Usuario[]>(this.urlUsuario + '/listar');
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.post<String>(this.urlUsuario + '/guardar', usuario);
  }

  editarUsuario(usuario: Usuario) {
    return this.http.put<String>(this.urlUsuario + '/editar', usuario);
  }

  eliminarUsuario(usuario: Usuario) {
    return this.http.delete<void>(this.urlUsuario + '/eliminar', {
      body: usuario,
    });
  }

  buscarUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(this.urlUsuario + '/buscar', usuario);
  }
}
