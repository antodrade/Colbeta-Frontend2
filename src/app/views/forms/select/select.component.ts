import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { Usuario } from 'src/app/models/usuario';
import {FormSelectDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent,
  CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective,
   ButtonDirective } from '@coreui/angular';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    standalone: true,
    imports: [FormsModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, FormSelectDirective, ReactiveFormsModule,
      RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, 
      CardBodyComponent, DocsExampleComponent, TableDirective, TableColorDirective, TableActiveDirective, 
      BorderDirective, AlignDirective, ButtonDirective
    ]
})
export class SelectComponent {

  constructor() { }

}
