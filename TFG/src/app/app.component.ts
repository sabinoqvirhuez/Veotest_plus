import {Component, OnInit} from '@angular/core';
import { hideHTML } from './services/hidehtml';
import {UserService} from "./services/user.service";
import {User} from "./models/user";
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit{

  public usuario :User;
  constructor(private servicio: UserService, private router: Router) {
    this.usuario = new User('','','',0,'');




  }

  ngOnInit() {

  }
// Llama a la función hideHTML importada desde hidehtml.ts
  toggleHTML() {
    hideHTML();
  }

  login(form:any){
    //console.log(this.usuario);
    this.servicio.loginUser(this.usuario).subscribe(
      res=>{
        console.log(res)
        this.toggleHTML();
        this.router.navigateByUrl('/usuarios');

      },
      error => {

        console.log(error);
        console.log("tiro el error por login()");
      }
    );
  }


  // Agregar un evento popstate al objeto window
  /*
  window.addEventListener("popstate", function(event) {
    // Llamar a la función hideHTML() para restaurar el estado anterior de visualización del elemento HTML
    toogleHTML();
  });

// Al hacer clic en un botón o enlace, agregar una entrada al historial del navegador con el estado actual de visualización del elemento HTML
  const buttonElement = document.getElementById("myButton");
  buttonElement.addEventListener("click", function(event) {
    const htmlElement = document.getElementById("LoginForm");
    if (htmlElement.style.display === "none") {
      htmlElement.style.display = "block";
      history.pushState({visible: true}, "LoginForm visible", "#LoginFormVisible");
    } else {
      htmlElement.style.display = "none";
      history.pushState({visible: false}, "LoginForm oculto", "#LoginFormOculto");
    }
  });
*/



}
