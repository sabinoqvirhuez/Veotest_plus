import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import {AppComponent} from "./app.component";
import {AuthGuard} from "./services/auth.guard";

import {ErrorComponent} from "./components/error/error.component";
import {CreateUserComponent} from "./components/usuarios/create-user/create-user.component";
import {ProfileUserComponent} from "./components/usuarios/profile-user/profile-user.component";
import{CambiarApellidoComponent} from "./components/usuarios/cambiar-apellido/cambiar-apellido.component";
import {CambiarContraseniaComponent} from "./components/usuarios/cambiar-contrasenia/cambiar-contrasenia.component";
import {CambiarNombreComponent} from "./components/usuarios/cambiar-nombre/cambiar-nombre.component";

const routes: Routes = [
  {path:'',redirectTo:'app',pathMatch:'full'},
  {path:'usuarios', component:UsuariosComponent,canActivate:[AuthGuard]},
  {path:'profile-user',component:ProfileUserComponent,canActivate:[AuthGuard]},
  {path:'cambiarContrasenia',component:CambiarContraseniaComponent,canActivate:[AuthGuard]},
  {path:'cambiarNombre',component:CambiarNombreComponent,canActivate:[AuthGuard]},
  {path:'cambiarApellido',component:CambiarApellidoComponent,canActivate:[AuthGuard]},
  {path:'create-user',component:CreateUserComponent},
  {path:'**',component:ErrorComponent}

];
/*
Para proteger un path con el authguard tengo que hacer
{
path:'X',
component:XComponent,
canActivate:[AuthGuard]}
 */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const appRoutingProviders: any []=[];
export const routing: ModuleWithProviders<RouterModule>=RouterModule.forRoot(routes);
