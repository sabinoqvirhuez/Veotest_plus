import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from "@angular/forms";
import { routing, appRoutingProviders} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TituloComponent} from "./titulo/titulo.component";
import { ExternoComponent } from './externo/externo.component';
import {PeticionesService} from "./services/peticiones.service";
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { CreateUserComponent } from './components/usuarios/create-user/create-user.component';


@NgModule({
  declarations: [
    AppComponent,
    TituloComponent,
    ExternoComponent,
    HomeComponent,
    UsuariosComponent,
    RegisterComponent,
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
    PeticionesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
