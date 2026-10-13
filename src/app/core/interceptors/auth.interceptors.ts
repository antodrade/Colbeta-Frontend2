
import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.obtenerToken();
    let reqFinal = req;
    console.log('ENTRÓ AL INTERCEPTOR:', req.url);

    if (token  && req.url.startsWith(environment.apiUrl)) {
        reqFinal = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
        });
    }
    console.log("este es el reqFinal: ",reqFinal)
    return next(reqFinal).pipe(
        catchError(error => {
            if (!authService.getCierrepor401Ejecutado() && error.status === 401){
                authService.cerrarSesion();
            }
            console.log("este mensaje viene del catcherror del interceptor", error);
            throw error;
        })
    )
};