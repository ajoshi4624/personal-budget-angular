import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'pb-menu',
  standalone: true,
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  imports: [RouterLink, RouterLinkActive],
})
export class Menu {

}
