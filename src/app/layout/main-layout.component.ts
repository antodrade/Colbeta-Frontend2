import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="flex min-h-screen w-full overflow-x-hidden bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      
      <!-- Overlay para móvil -->
      @if (isMobileMenuOpen()) {
        <div 
          class="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm transition-opacity md:hidden"
          (click)="closeMobileMenu()"
        ></div>
      }

      <!-- Sidebar (Drawer en móvil, Estático en desktop) -->
      <aside 
        class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-950 transition-transform duration-300 ease-in-out md:static md:translate-x-0"
        [class.-translate-x-full]="!isMobileMenuOpen()"
        [class.translate-x-0]="isMobileMenuOpen()"
      >
        <!-- Logo / Marca -->
        <div class="flex h-14 items-center px-6 border-b border-white/5">
          <div class="flex items-center gap-2.5">
            <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/20">
              <span class="text-[11px] font-bold text-white uppercase tracking-tighter">CB</span>
            </div>
            <span class="text-sm font-bold tracking-tight text-white uppercase">Colbeta</span>
          </div>
        </div>

        <!-- Navegación -->
        <nav class="flex-1 overflow-y-auto py-6 px-3 space-y-7 scrollbar-none">
          @for (section of sections; track section.title) {
            <div class="space-y-1.5">
              <h3 class="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500/80">
                {{ section.title }}
              </h3>
              
              <div class="space-y-0.5">
                @for (link of section.links; track link.url) {
                  <a
                    [routerLink]="link.url"
                    routerLinkActive="active-link"
                    [routerLinkActiveOptions]="{ exact: true }"
                    (click)="closeMobileMenu()"
                    class="group flex items-center gap-3 rounded-md px-3 py-2 text-xs font-medium text-slate-400 no-underline transition-all duration-150 hover:bg-slate-800/60 hover:text-white"
                  >
                    <!-- Indicador Activo (Dot) - Se muestra via CSS clase .active-link -->
                    <div class="hidden active-dot w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                    
                    <svg 
                      class="h-4 w-4 shrink-0 transition-colors duration-200 opacity-60 group-hover:opacity-100" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      stroke-width="1.5"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="link.iconPath" />
                    </svg>
                    <span class="truncate">{{ link.label }}</span>
                  </a>
                }
              </div>
            </div>
          }
        </nav>

        <!-- Perfil de usuario (Bottom) -->
        <div class="mt-auto border-t border-white/5 p-4">
          <div class="flex items-center gap-3 rounded-xl bg-white/5 p-2.5">
            <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white ring-1 ring-white/10">
              AD
            </div>
            <div class="flex min-w-0 flex-1 flex-col">
              <span class="truncate text-[11px] font-semibold text-slate-200 leading-none">Administrador</span>
              <span class="truncate text-[9px] text-slate-500 mt-1">Soporte Técnico</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Área de Contenido Principal -->
      <div class="flex min-w-0 flex-1 flex-col">
        
        <!-- Header Superior -->
        <header class="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md md:px-8">
          <div class="flex items-center gap-4">
            <!-- Botón Hamburguesa Móvil -->
            <button 
              (click)="toggleMobileMenu()" 
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 md:hidden"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            <!-- Breadcrumbs / Título -->
            <div class="hidden items-center gap-2 text-xs font-medium md:flex py-4 mb-2">
              <span class="text-slate-400">App</span>
              <span class="text-slate-300">/</span>
              <span class="text-slate-600">Overview</span>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <button class="text-slate-400 hover:text-slate-600 transition-colors">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
            </button>
            <div class="h-7 w-7 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">
               <img src="assets/images/avatars/1.jpg" alt="Profile" class="h-full w-full object-cover" onerror="this.src='https://ui-avatars.com/api/?name=Admin&background=random' shadow-sm">
            </div>
          </div>
        </header>

        <!-- Main Viewport -->
        <main class="flex-1 overflow-x-hidden p-4 md:p-8">
          <div class="mx-auto max-w-7xl animate-in fade-in duration-500">
            <router-outlet />
          </div>
        </main>
      </div>
    </div>

    <style>
      /* Estilo para el link activo sin contaminar el componente globalmente */
      .active-link {
        color: #f8fafc !important; /* text-slate-50 */
        background-color: rgba(255, 255, 255, 0.05) !important;
      }
      .active-link .active-dot {
        display: block !important;
      }
      .active-link svg {
        opacity: 1 !important;
        color: #6366f1 !important; /* text-indigo-500 */
      }
      /* Ocultar scrollbar pero permitir scroll */
      .scrollbar-none::-webkit-scrollbar { display: none; }
      .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
  `
})
export class MainLayoutComponent {
  isMobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  readonly sections = [
    {
      title: 'General',
      links: [
        { 
          label: 'Dashboard', 
          url: '/dashboard', 
          iconPath: 'M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z' 
        }
      ]
    },
    {
      title: 'Usuarios',
      links: [
        { 
          label: 'Listado de Usuarios', 
          url: '/usuarios', 
          iconPath: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z' 
        }
      ]
    },
    {
      title: 'Empresas',
      links: [
        { 
          label: 'Gestión de Empresas', 
          url: '/empresas', 
          iconPath: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z' 
        }
      ]
    },
    {
      title: 'Documentos',
      links: [
        { 
          label: 'Formularios PDF', 
          url: '/formularios-pdf', 
          iconPath: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z' 
        },
        { 
          label: 'Escanear Documento', 
          url: '/escanear-pdf', 
          iconPath: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 3h.008v.008H12V18Zm-3-6h.008v.008H9v-.008ZM9 15h.008v.008H9V15Zm0 3h.008v.008H9V18Zm6-6h.008v.008H15v-.008Zm0 3h.008v.008H15V15Zm0 3h.008v.008H15V18Z' 
        }
      ]
    }
  ];
}
