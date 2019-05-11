import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard'
import {NologinGuard} from './guards/nologin.guard'
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './componentes/login/login.module#LoginPageModule', canActivate: [NologinGuard] },
  { path: 'menu', loadChildren: './componentes/menu/menu.module#MenuPageModule', canActivate:[AuthGuard] },
  { path: 'registro', loadChildren: './componentes/registro/registro.module#RegistroPageModule',canActivate: [NologinGuard]  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
