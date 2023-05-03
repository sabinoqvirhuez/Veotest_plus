import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from "@angular/forms";
import { routing, appRoutingProviders} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TituloComponent} from "./titulo/titulo.component";
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ErrorComponent } from './components/error/error.component';
import { CreateUserComponent } from './components/usuarios/create-user/create-user.component';
import {UserService} from "./services/user.service";


@NgModule({
  declarations: [
    AppComponent,
    TituloComponent,
    HomeComponent,
    UsuariosComponent,
    ErrorComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    routing,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
