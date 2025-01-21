import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormularioEps} from '../../../models/formularioEps'

@Component({
  selector: 'form-eps',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-eps.component.html',
  styleUrl: './form-eps.component.scss'
})
export class FormEpsComponent {

formulario: FormularioEps = new FormularioEps();

}
