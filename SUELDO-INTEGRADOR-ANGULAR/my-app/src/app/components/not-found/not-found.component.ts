import { Component } from '@angular/core';
import { faBug, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  faBug = faBug;
  faHome = faHome;
}
