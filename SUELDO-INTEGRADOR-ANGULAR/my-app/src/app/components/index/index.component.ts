import { Component, OnInit } from '@angular/core';
import {
  faCoins,
  faArrowUpWideShort,
  faUsers,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { DashBoard } from 'src/app/models/DashBoard';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  faCoins = faCoins;
  faArrowUpWideShort = faArrowUpWideShort;
  faUsers = faUsers;
  faCartShopping = faCartShopping;
  dashboard!: DashBoard;

  constructor(public adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.obtenerInfoDashboard().subscribe((res) => {
      this.dashboard = res;
    });
  }
}
