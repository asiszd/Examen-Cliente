import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'ExamenACS';

  //Crea un objeto Router para la navegación entre componentes
  constructor(private router: Router) {}

  listarRoles() {
    this.router.navigate(['roles']);
  }

  listarUsuarios() {
    this.router.navigate(['usuarios']);
  }
}
