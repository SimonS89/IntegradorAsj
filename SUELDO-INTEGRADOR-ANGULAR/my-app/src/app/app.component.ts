import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  mostrarNavbarYFooter: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const compName =
          this.activatedRoute.firstChild?.snapshot.component?.name;
        const isLoginComponent =
          compName === 'LoginComponent' || compName === 'RegisterComponent';
        this.mostrarNavbarYFooter = !isLoginComponent;
      });
  }
}
