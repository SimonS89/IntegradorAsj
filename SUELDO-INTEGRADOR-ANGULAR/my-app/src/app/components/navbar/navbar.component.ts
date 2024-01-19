import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  faUser = faUser;

  constructor(private router: Router, public alertService: AlertService) {}

  cerrarSesion() {
    this.alertService
      .question('¿Desea cerrar sesión?', true, true, 'Aceptar', 'Cancelar')
      .then((res) => {
        if (res) {
          this.router.navigate(['']);
        }
      });
  }
}
