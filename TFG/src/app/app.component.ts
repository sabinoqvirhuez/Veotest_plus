import {Component, OnInit} from '@angular/core';
import { hideHTML } from './services/hidehtml';
import {UserService} from "./services/user.service";
import {User} from "./models/user";
import { Router } from '@angular/router';
import {HttpResponse} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {AuthGuard} from "./services/auth.guard";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit{

  public usuario :User;
  public status: string;
  usersA: User[]=[];

  constructor(private servicio: UserService, private router: Router,private auth: AuthGuard) {
    this.usuario = new User('','','',0,'');
    this.status = '';




  }

  ngOnInit() {



  }

// Llama a la función hideHTML importada desde hidehtml.ts
  toggleHTML() {
    hideHTML();
  }

  login(form:any){

    this.servicio.loginUser(this.usuario).subscribe(
      (res: HttpResponse<any>) => {
        if(res.status==200) {
          form.reset();
          var responseObj = res.body.resp as { Userid: number };
          var id = responseObj.Userid.toString();
          var token = res.body.token as string;
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('Userid',id);
          this.status= 'success';

          const aux = sessionStorage.getItem('Userid');
          let aux2: number;

          if (aux !== null) {
            aux2 = parseInt(aux);

            this.servicio.showUser(aux2).subscribe(user => {
              this.usersA = user;





            });
          } else {
            console.log('ESTA OCURRIENDO UN FALLO');

          }

        }
      },
      error => {
        console.error(error);
        this.status= 'failed';
      }
    );
  }

  //Metodo para comprobar que un usuario está logeado, si lo está devuelve true, sino False
  loggedIn(){
    if(sessionStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }
  //Metodo que obtiene el token de un session Storage, en caso de haberlo
  getToken(){
    return sessionStorage.getItem('token');
  }
//Metodo que borra el token e IdUsuario del sessionStorage
  deleteToken(){


      sessionStorage.removeItem('token');
      sessionStorage.removeItem('Userid');
      let aux :boolean=this.auth.canActivate();



  }





}
