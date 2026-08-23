import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: { title: 'Dashboard' }
      },
      {
        path: 'formularios-pdf',
        loadComponent: () => import('./features/form-eps/form-eps.component').then(m => m.FormEpsComponent),
        data: { title: 'Formularios PDF' }
      },
      {
        path: 'empresas',
        loadComponent: () => import('./features/empresas/empresas.component').then(m => m.EmpresasComponent),
        data: { title: 'Empresas' }
      },
      {
        // Ruta histórica: apuntaba al mismo listado de empresas (que es donde
        // viven los exportadores de Excel/PILA). Se conserva como redirect
        // para no romper enlaces guardados.
        path: 'pila',
        redirectTo: 'empresas',
        pathMatch: 'full'
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./features/usuarios/usuarios.component').then(m => m.UsuariosComponent),
        data: { title: 'Usuarios' }
      },
      {
        path: 'usuarios/nuevo',
        loadComponent: () => import('./features/nuevo-usuario/nuevo-usuario.component').then(m => m.NuevoUsuarioComponent),
        data: { title: 'Nuevo usuario' }
      },
      {
        path: 'empresas/nueva',
        loadComponent: () => import('./features/nueva-empresa/nueva-empresa.component').then(m => m.NuevaEmpresaComponent),
        data: { title: 'Nueva empresa' }
      },
      {
        path: 'escanear-pdf',
        loadComponent: () => import('./features/pdf-scanner/pdf-scanner.component').then(m => m.PdfScannerComponent),
        data: { title: 'Escáner de PDF' }
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    data: { title: 'Login' }
  },
  {
    path: 'register',
    loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent),
    data: { title: 'Registro' }
  },
  { path: '**', redirectTo: 'dashboard' }
];
