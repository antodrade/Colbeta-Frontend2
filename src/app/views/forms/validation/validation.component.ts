import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/usuario.service';
import { RouterLink } from '@angular/router';
import { FirestoreService } from '../../../servicios/firestore.service';

@Component({
    selector: 'app-validation',
    templateUrl: './validation.component.html',
    styleUrls: ['./validation.component.scss'],
    standalone: true,
    imports: [FormsModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, 
      CardBodyComponent, DocsExampleComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, 
      FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective,
       FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,
        ButtonDirective, ListGroupDirective, ListGroupItemDirective, RouterLink]
})
export class ValidationComponent implements OnInit {

  customStylesValidated = false;
  browserDefaultsValidated = false;
  tooltipValidated = false;
  usuario: Usuario = new Usuario();

  constructor(private usuarioServicio: UsuarioService, private firestoreService: FirestoreService) { }

  ngOnInit(): void { }

  enviar(){

  }

  // 1. Declarar la variable para que la plantilla la reconozca
  fileName: string = '';
 archivo: File | null = null;;
 urlFirma: string = "";

  // 2. Agregar el método para capturar la selección del archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivo = input.files[0];
      this.fileName = this.archivo.name;
    } else {
      this.fileName = '';
    }
  }

   cargarFirma(): void {
    if (this.archivo != null){
   this.firestoreService.guardarFirma(this.archivo).subscribe({
    next:(response: any)=> {
     this.urlFirma = response;
     console.log(this.urlFirma);
     console.log((this.urlFirma as any).name);
     console.log(response.generation);
     this.obtenerURLFirma();
    },
    error: (err) => {
      console.error("ha ocurrido el siguiente error", err)
    }
   })
    }else {
      console.warn("no hay ningún archivo seleccionado")
    }
  }

obtenerURLFirma(): void {
  this.firestoreService.obtenerDownloadURL(this.fileName)
  .then((url: string) => {
    this.urlFirma = url;
    console.log('URL obtenida correctamente:', url);
    this.usuario.urlFirma = this.urlFirma;
  })
  .catch((error) => {
   console.error('Error la obtener la URL:', error)
  });
}


guardarUsuario(): void{
  
this.usuarioServicio.agregarUsuarioLista(this.usuario).subscribe(
  {
    next:(datos)=>{
      this.irListaUsuarios();
    },
    error: (error: any) => {console.log("holaaa este es el error", error)}
  }
);
}

irListaUsuarios(){
  console.log("holaaaaaaaaaaaaaa")
}
  
  onSubmit1() {
    this.customStylesValidated = true;
    console.log('Submit... 1');
  }

  onReset1() {
    this.customStylesValidated = false;
    console.log('Reset... 1');
  }

  onSubmit2() {
    this.browserDefaultsValidated = true;
    console.log('Submit... 2');
  }

  onReset2() {
    this.browserDefaultsValidated = false;
    console.log('Reset... 3');
  }

  onSubmit3() {
    this.tooltipValidated = true;
    console.log('Submit... 3');
  }

  onReset3() {
    this.tooltipValidated = false;
    console.log('Reset... 3');
  }


}
