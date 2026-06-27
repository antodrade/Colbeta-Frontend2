import { Component, inject } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { LoginData } from '../../../models/loginData';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../usuario.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, FormsModule]
})
export class LoginComponent {
loginData: LoginData = new LoginData();
token2 = "";
private router = inject(Router);
constructor(private usuarioServicio: UsuarioService){}
loguear(): void{
  const usuario = this.loginData.usuario;
  const password = this.loginData.password;
console.log(usuario);
console.log(password);
this.usuarioServicio.loguearse(usuario, password).subscribe(
datos => {this.token2=datos;
  console.log("token recibido con exito del login"+this.token2);
  localStorage.setItem("token2",datos);
  localStorage.setItem('umpalumpa2','vea usted2');
  this.router.navigate(['/home']);
}
)}}
