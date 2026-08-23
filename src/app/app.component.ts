import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'FormuSanitas | Colbeta';

  readonly #titleService = inject(Title);
  readonly #iconSetService = inject(IconSetService);

  constructor() {
    this.#titleService.setTitle(this.title);
    // iconSet singleton — todavía lo usan las vistas heredadas (login, register, 404, 500, dashboard).
    this.#iconSetService.icons = { ...iconSubset };
  }
}
