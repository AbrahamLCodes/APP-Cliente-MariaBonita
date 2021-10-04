import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoOrdenPendienteGuard, NoSessionGuard, OrdenPendienteGuard, SessionGuard } from './guards/guards';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [SessionGuard, NoOrdenPendienteGuard]
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'ordenar',
    loadChildren: () => import('./ordenar/ordenar.module').then(m => m.OrdenarPageModule),
    canActivate: [SessionGuard, NoOrdenPendienteGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule),
    canActivate: [SessionGuard, NoOrdenPendienteGuard]
  },
  {
    path: 'item',
    loadChildren: () => import('./item/item.module').then(m => m.ItemPageModule),
    canActivate: [SessionGuard, NoOrdenPendienteGuard]
  },
  {
    path: 'cesta',
    loadChildren: () => import('./cesta/cesta.module').then(m => m.CestaPageModule),
    canActivate: [SessionGuard, NoOrdenPendienteGuard]
  },
  {
    path: 'pago1',
    loadChildren: () => import('./pago1/pago1.module').then(m => m.Pago1PageModule),
    canActivate: [SessionGuard, NoOrdenPendienteGuard]
  },
  {
    path: 'typage',
    loadChildren: () => import('./typage/typage.module').then(m => m.TypagePageModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'pedidoexitoso',
    loadChildren: () => import('./pedidoexitoso/pedidoexitoso.module').then(m => m.PedidoexitosoPageModule),
    canActivate: [SessionGuard, OrdenPendienteGuard]
  },
  {
    path: 'misdirecciones',
    loadChildren: () => import('./misdirecciones/misdirecciones.module').then(m => m.MisdireccionesPageModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'monedero',
    loadChildren: () => import('./monedero/monedero.module').then(m => m.MonederoPageModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'mispedidos',
    loadChildren: () => import('./mispedidos/mispedidos.module').then(m => m.MispedidosPageModule),
    canActivate: [SessionGuard]

  },
  {
    path: 'editarperfil',
    loadChildren: () => import('./editarperfil/editarperfil.module').then(m => m.EditarperfilPageModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'metodopago',
    loadChildren: () => import('./metodopago/metodopago.module').then(m => m.MetodopagoPageModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'anadirtarjeta',
    loadChildren: () => import('./anadirtarjeta/anadirtarjeta.module').then(m => m.AnadirtarjetaPageModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'adddireccion',
    loadChildren: () => import('./adddireccion/adddireccion.module').then(m => m.AdddireccionPageModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'editdireccion',
    loadChildren: () => import('./editdireccion/editdireccion.module').then(m => m.EditdireccionPageModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'alertas',
    loadChildren: () => import('./alertas/alertas.module').then(m => m.AlertasPageModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [NoSessionGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule),
    canActivate: [NoSessionGuard]
  },
  {
    path: 'historia',
    loadChildren: () => import('./historia/historia.module').then(m => m.HistoriaPageModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'sucursales',
    loadChildren: () => import('./sucursales/sucursales.module').then(m => m.SucursalesPageModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'suscripcion',
    loadChildren: () => import('./suscripcion/suscripcion.module').then(m => m.SuscripcionPageModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'comentarios',
    loadChildren: () => import('./comentarios/comentarios.module').then(m => m.ComentariosPageModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [SessionGuard]
  },
  {
    path: 'login-provider',
    loadChildren: () => import('./login-provider/login-provider.module').then( m => m.LoginProviderPageModule)
  },
  {
    path: 'login-facebook',
    loadChildren: () => import('./login-facebook/login-facebook.module').then( m => m.LoginFacebookPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
