import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SideMenu } from "../../components/side-menu/side-menu";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    RouterOutlet,
    SideMenu
],
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardPage {}
