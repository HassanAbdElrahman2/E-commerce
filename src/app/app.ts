import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../layouts/footer/footer.component";
import { NavbarComponent } from "../layouts/navbar/navbar.component";
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('E-commerce');

}
