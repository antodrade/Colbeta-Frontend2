import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
     canActivate: [authGuard],
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'escanear-pdf',
        loadComponent: () => import('./pdf-scanner/pdf-scanner.component').then(m => m.PdfScannerComponent),
        canActivate: [authGuard],
        data: {
          title: 'Escáner de PDF'
        }
      },
  
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
        //  canActivate: [authGuard]
      },
      // {
      //   path: 'form-eps',
      //   loadChildren: () => import('./views/base/form-eps').then((m) => m.routes)
      // },
      {
        path: 'home',
        loadChildren: () => import('./views/home/routes').then((m) => m.routes),
         canActivate: [authGuard]
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/routes').then((m) => m.routes)
        ,canActivate: [authGuard]
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes)
        ,canActivate: [authGuard]
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
        ,canActivate: [authGuard]
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
         ,canActivate: [authGuard]
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
         ,canActivate: [authGuard]
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
         ,canActivate: [authGuard]
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
         ,canActivate: [authGuard]
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
         ,canActivate: [authGuard]
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
         ,canActivate: [authGuard]
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    canActivate: [authGuard],
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
      canActivate: [authGuard],
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
      // canActivate: [authGuard],
    data: {
      title: 'Login Page'
    }
  },
   {
    path: 'login2',
    loadComponent: () => import('./views/login/login.component').then(m => m.LoginComponent),
      canActivate: [authGuard],
    data: {
      title: 'Login Page2'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
      //canActivate: [authGuard],
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];
