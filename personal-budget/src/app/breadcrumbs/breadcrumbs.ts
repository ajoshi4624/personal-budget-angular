import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pb-breadcrumbs',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="crumbs" aria-label="Breadcrumb">
      <a routerLink="/">Home</a>
      <span class="sep">/</span>
      <span>Dashboard</span>
    </nav>
  `,
  styles: [`
    .crumbs {
      display:flex; align-items:center; gap:.5rem;
      color:#666; font-size:.95rem; margin: .5rem 0 1rem;
    }
    .crumbs a { color:#4682b4; text-decoration:none; }
    .crumbs a:hover { text-decoration:underline; }
    .sep { opacity:.6; }
  `]
})
export class Breadcrumbs {}
