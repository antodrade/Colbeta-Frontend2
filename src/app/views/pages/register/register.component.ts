import { Component, inject } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../usuario.service';
import { FormsModule } from '@angular/forms';
import { LoginData } from '../../../models/loginData';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, FormsModule]
})
export class RegisterComponent {
  loginData: LoginData = new LoginData();
  
  private router = inject(Router);
  constructor(private usuarioServicio: UsuarioService) { }

 registrar(): void{
 this.usuarioServicio.agregarUsuarioData(this.loginData).subscribe(
 (datos)=>{
 this.router.navigate(['/login']);
 console.log("registrado")
 }
 )


 }


}
