import { Component, inject } from '@angular/core';
import { LoginData } from '../../models/loginData';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
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
 localStorage.setItem("umpalumpa2","vea usted2");
this.usuarioServicio.loguearse("Antonio6", "123456789").subscribe(
datos => {this.token2=datos;
  console.log("token recibido con exito del login"+this.token2);
  localStorage.setItem("token2",datos);
  localStorage.setItem('umpalumpa2','vea usted2');
   this.router.navigate(['/home']);
}
)
}


}
