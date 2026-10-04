import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

private router = inject(Router);
private sesionActiva = true;

    guardarToken(token: string): void {
        localStorage.setItem('token2',token);
        this.iniciarSesion();
    }

    obtenerToken(): string | null {
        return localStorage.getItem('token2');
    }

    iniciarSesion(): void {
        this.sesionActiva = true;
    }

    cerrarSesion(): void {
        this.sesionActiva = false;
        localStorage.removeItem('token2');
        this.router.navigate(['/login']);
    }

    getSesionActiva(): boolean {
        return this.sesionActiva;
    }


}