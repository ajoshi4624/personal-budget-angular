import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './menu/menu';
import { Hero } from './hero/hero';
import { Footer } from './footer/footer';
import { Homepage } from './homepage/homepage';
import { Article } from './article/article';
import { About } from './about/about';
import { Login } from './login/login';
import { P404 } from './p404/p404';


@Component({
  selector: 'pb-root',
  standalone: true,
  imports: [RouterOutlet, Menu, Hero, Footer, Homepage, Article, About, Login, P404],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('personal-budget');
}
