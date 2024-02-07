import { Component } from '@angular/core';
import {
  faCoins,
  faArrowUpWideShort,
  faUsers,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  faCoins = faCoins;
  faArrowUpWideShort = faArrowUpWideShort;
  faUsers = faUsers;
  faCartShopping = faCartShopping;
}
