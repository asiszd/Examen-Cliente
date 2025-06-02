import { Rol } from './Rol';

export class Usuario {
  id!: number;
  nombre!: String;
  app!: String;
  apm!: String;
  sexo!: String;
  correo!: String;
  fechaNacimiento!: Date;
  fechaCreacion!: Date;
  rolId!: Rol;
}
