import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  template: `
    <section class="mx-auto max-w-4xl">
      <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 class="m-0 text-xl font-semibold text-slate-800">Dashboard</h2>
        <p class="mt-2 text-sm text-slate-500">
          Aquí irá el resumen de la operación: formularios generados, usuarios y empresas
          registrados, y el estado de los aportes a PILA.
        </p>
      </div>
    </section>
  `
})
export class DashboardComponent {}
