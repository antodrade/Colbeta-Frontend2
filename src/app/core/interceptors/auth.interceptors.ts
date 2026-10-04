
import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    console.log('ENTRÓ AL INTERCEPTOR:', req.url);
    return next(req).pipe(
        catchError(error => {
            if (error.status === 401){
                authService.cerrarSesion();
            }
            console.log("este mensaje viene del catcherror del interceptor", error);
            throw error;
        })
    )
};