import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faUser = faUser;
  user: string = '';
  rutaActual: string = '';
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    public alertService: AlertService,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    this.isAdmin = this.authService
      .obtenerRoles()
      .some((rol) => rol.rol == 'ADMIN');
    this.user = localStorage.getItem('user')!;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.rutaActual = event.url;
      }
    });
  }

  cerrarSesion() {
    this.alertService
      .question(
        `¿Deseas cerrar sesión ${this.user}?`,
        true,
        true,
        'Aceptar',
        'Cancelar'
      )
      .then((res) => {
        if (res) {
          this.authService.logout();
        }
      });
  }
}
