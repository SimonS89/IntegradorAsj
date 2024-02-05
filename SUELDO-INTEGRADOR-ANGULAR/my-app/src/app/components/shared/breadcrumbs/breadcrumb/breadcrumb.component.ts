import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnDestroy {
  public titulo?: string;
  public tituloSubs$: Subscription;
  constructor(private router: Router) {
    this.tituloSubs$ = this.obtenerArgumentos().subscribe(({ titulo }) => {
      this.titulo = titulo;
      document.title = `ASJ - ${titulo}`;
    });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  obtenerArgumentos() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
  volverAtras() {
    window.history.back();
  }
}
