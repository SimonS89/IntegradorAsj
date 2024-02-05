import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faUser = faUser;
  user: string = '';
  rutaActual: string = '';

  constructor(private router: Router, public alertService: AlertService) {}
  ngOnInit(): void {
    this.user = localStorage.getItem('user')!;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.rutaActual = event.url;
        console.log(this.rutaActual.includes('admin'));
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
          this.router.navigate(['']);
        }
      });
  }
}
