import { Component } from '@angular/core';
import { LoginData } from '../../models/loginData';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
loginData: LoginData = new LoginData();


loguear(): void{
console.log(this.loginData.usuario);
console.log(this.loginData.password);
}

}
