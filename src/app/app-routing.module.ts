import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./paginas/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'alertas',
    loadChildren: () => import('./paginas/alertas/alertas.module').then( m => m.AlertasPageModule)
  },
  {
    path: 'acciones',
    loadChildren: () => import('./paginas/acciones/acciones.module').then( m => m.AccionesPageModule)
  },
  {
    path: 'avatar',
    loadChildren: () => import('./paginas/avatar/avatar.module').then( m => m.AvatarPageModule)
  },
  {
    path: 'botones',
    loadChildren: () => import('./paginas/botones/botones.module').then( m => m.BotonesPageModule)
  },
  {
    path: 'card',
    loadChildren: () => import('./paginas/card/card.module').then( m => m.CardPageModule)
  },
  {
    path: 'check',
    loadChildren: () => import('./paginas/check/check.module').then( m => m.CheckPageModule)
  },
  {
    path: 'fab',
    loadChildren: () => import('./paginas/fab/fab.module').then( m => m.FabPageModule)
  },
  {
    path: 'grid',
    loadChildren: () => import('./paginas/grid/grid.module').then( m => m.GridPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./paginas/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./paginas/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./paginas/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./paginas/tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./paginas/tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./paginas/tab3/tab3.module').then( m => m.Tab3PageModule)
  },
  {
    path: 'push',
    loadChildren: () => import('./paginas/push/push.module').then( m => m.PushPageModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('./paginas/maps/maps.module').then( m => m.MapsPageModule)
  },
  {
    path: 'mapa/:lat/:lng',
    loadChildren: () => import('./paginas/mapa/mapa.module').then( m => m.MapaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
