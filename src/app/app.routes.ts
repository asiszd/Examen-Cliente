import { Routes } from '@angular/router';
import { ListarRol } from './Components/listar-rol/listar-rol';
import { ListarUsuario } from './Components/listar-usuario/listar-usuario';
import { NuevoRol } from './Components/nuevo-rol/nuevo-rol';
import { NuevoUsuario } from './Components/nuevo-usuario/nuevo-usuario';
import { EditarRol } from './Components/editar-rol/editar-rol';
import { EditarUsuario } from './Components/editar-usuario/editar-usuario';

export const routes: Routes = [
  {
    path: 'roles',
    component: ListarRol,
  },
  {
    path: 'usuarios',
    component: ListarUsuario,
  },
  {
    path: 'nuevoRol',
    component: NuevoRol,
  },
  {
    path: 'nuevoUsuario',
    component: NuevoUsuario,
  },
  {
    path: 'editarRol',
    component: EditarRol,
  },
  {
    path: 'editarUsuario',
    component: EditarUsuario,
  },
];
