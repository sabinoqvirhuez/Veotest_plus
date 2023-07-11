import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from "@angular/forms";
import { routing, appRoutingProviders} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpInterceptor} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CreateUserComponent } from './components/usuarios/create-user/create-user.component';
import {UserService} from "./services/user.service";
import {AuthGuard} from "./services/auth.guard";
import {TokenService} from "./services/token.service";
import { ProfileUserComponent } from './components/usuarios/profile-user/profile-user.component';
import { CambiarNombreComponent } from './components/usuarios/cambiar-nombre/cambiar-nombre.component';
import { CambiarApellidoComponent } from './components/usuarios/cambiar-apellido/cambiar-apellido.component';
import { CambiarContraseniaComponent } from './components/usuarios/cambiar-contrasenia/cambiar-contrasenia.component';
import { DeleteAdminComponent } from './components/usuarios/delete-admin/delete-admin.component';
import { RobotComponent } from './components/robot/robot.component';
import { CrearRobotComponent } from './components/robot/crear-robot/crear-robot.component';
import { RobotProfileComponent } from './components/robot/robot-profile/robot-profile.component';
import { UpdateRobotComponent } from './components/robot/update-robot/update-robot.component';
import { ClaveComponent } from './components/clave/clave.component';
import { CreateKeyComponent } from './components/clave/create-key/create-key.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { CreateSolicitudComponent } from './components/solicitudes/create-solicitud/create-solicitud.component';
import { IncidenciasComponent } from './components/incidencias/incidencias.component';
import { CreateIncidenciaComponent } from './components/incidencias/create-incidencia/create-incidencia.component';
import { ProfileIncidenciaComponent } from './components/incidencias/profile-incidencia/profile-incidencia.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    CreateUserComponent,
    ProfileUserComponent,
    CambiarNombreComponent,
    CambiarApellidoComponent,
    CambiarContraseniaComponent,
    DeleteAdminComponent,
    RobotComponent,
    CrearRobotComponent,
    RobotProfileComponent,
    UpdateRobotComponent,
    ClaveComponent,
    CreateKeyComponent,
    SolicitudesComponent,
    CreateSolicitudComponent,
    IncidenciasComponent,
    CreateIncidenciaComponent,
    ProfileIncidenciaComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    routing,
    HttpClientModule
  ],
  //En providers meto los .ts que quiero poder utilizar en todas las clases
  providers: [
    appRoutingProviders,
    UserService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
