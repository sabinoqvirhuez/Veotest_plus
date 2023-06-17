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
import {DeleteAdminComponent} from "./components/usuarios/delete-admin/delete-admin.component";
import {RobotComponent} from "./components/robot/robot.component";
import {CrearRobotComponent} from "./components/robot/crear-robot/crear-robot.component";
import {RobotProfileComponent} from "./components/robot/robot-profile/robot-profile.component";
import {UpdateRobotComponent} from "./components/robot/update-robot/update-robot.component";
import{ClaveComponent} from "./components/clave/clave.component";
import {CreateKeyComponent} from "./components/clave/create-key/create-key.component";
import {SolicitudesComponent} from "./components/solicitudes/solicitudes.component";
import {CreateSolicitudComponent} from "./components/solicitudes/create-solicitud/create-solicitud.component";
import {IncidenciasComponent} from "./components/incidencias/incidencias.component";

const routes: Routes = [
  {path:'',redirectTo:'app',pathMatch:'full'},
  {path:'usuarios', component:UsuariosComponent,canActivate:[AuthGuard]},
  {path:'deleteAdmin',component:DeleteAdminComponent,canActivate:[AuthGuard]},
  {path:'profile-user',component:ProfileUserComponent,canActivate:[AuthGuard]},
  {path:'cambiarContrasenia',component:CambiarContraseniaComponent,canActivate:[AuthGuard]},
  {path:'cambiarNombre',component:CambiarNombreComponent,canActivate:[AuthGuard]},
  {path:'cambiarApellido',component:CambiarApellidoComponent,canActivate:[AuthGuard]},
  {path:'create-user',component:CreateUserComponent},
  {path:'robots',component:RobotComponent,canActivate:[AuthGuard]},
  {path:'createRobot',component:CrearRobotComponent,canActivate:[AuthGuard]},
  {path:'profileRobot/:name',component:RobotProfileComponent,canActivate:[AuthGuard]},
  {path:'updateRobot/:name',component:UpdateRobotComponent,canActivate:[AuthGuard]},
  {path:'keys',component:ClaveComponent,canActivate:[AuthGuard]},
  {path:'create-key',component:CreateKeyComponent,canActivate:[AuthGuard]},
  {path:'solicitudes',component:SolicitudesComponent,canActivate:[AuthGuard]},
  {path:'create-solicitud',component:CreateSolicitudComponent,canActivate:[AuthGuard]},
  {path:'incidencias',component:IncidenciasComponent,canActivate:[AuthGuard]},

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
