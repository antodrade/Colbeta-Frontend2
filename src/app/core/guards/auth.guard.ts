import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {jwtDecode}  from 'jwt-decode'
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  //verificamos si existe el token en el localStorage
  const token = authService.obtenerToken();
 


if (!token){
  router.navigate(['/login']);
  return false
}

try{
  // Decodificamos el token para ver que tiene adentro
  const decoded: any = jwtDecode(token);

//Obtenemos la fecha de expiración -viene en segundos-
 const expirationTime = decoded.exp;


 //Obtenemos el tiempo actual del sistema en segundos
 const currentTime = Math.floor(Date.now()/1000)

if (expirationTime < currentTime){
console.warn("el token ha expirado, limpiando sesión....");

authService.cerrarSesion();
router.navigate(['/login']);
return false;
}
  return true;
}catch(error){
  console.error("Token invalido o corrupto", error);
authService.cerrarSesion();
router.navigate(['/login']);
return false;
 }
}
