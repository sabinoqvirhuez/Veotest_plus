import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from "@angular/forms";
import { routing, appRoutingProviders} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpInterceptor} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ErrorComponent } from './components/error/error.component';
import { CreateUserComponent } from './components/usuarios/create-user/create-user.component';
import {UserService} from "./services/user.service";
import {AuthGuard} from "./services/auth.guard";
import {TokenService} from "./services/token.service";
import { ProfileUserComponent } from './components/usuarios/profile-user/profile-user.component';
import { CambiarNombreComponent } from './components/usuarios/cambiar-nombre/cambiar-nombre.component';
import { CambiarApellidoComponent } from './components/usuarios/cambiar-apellido/cambiar-apellido.component';
import { CambiarContraseniaComponent } from './components/usuarios/cambiar-contrasenia/cambiar-contrasenia.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    ErrorComponent,
    CreateUserComponent,
    ProfileUserComponent,
    CambiarNombreComponent,
    CambiarApellidoComponent,
    CambiarContraseniaComponent
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
