import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import {AppComponent} from "./app.component";

import {ErrorComponent} from "./components/error/error.component";
import {CreateUserComponent} from "./components/usuarios/create-user/create-user.component";

const routes: Routes = [
  {path:'',redirectTo:'app',pathMatch:'full'},
  {path:'usuarios', component:UsuariosComponent},
  {path:'create-user',component:CreateUserComponent},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const appRoutingProviders: any []=[];
export const routing: ModuleWithProviders<RouterModule>=RouterModule.forRoot(routes);
