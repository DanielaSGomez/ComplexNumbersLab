import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComplexComponent } from './features/complex-component/complex-component';
import { FooterComponent } from "./shared/layout/footer-component/footer-component";


@Component({
  selector: 'app-root',
  imports: [ComplexComponent, FooterComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Complex Numbers Calcualtor');
}
