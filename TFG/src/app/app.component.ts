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

  /*

  getaux() {
    this.conex.getAthorization(this.user_nickname, this.user_password).subscribe(
      response => {
        if (respone.status == 200) {
          var user_id= response.body.["user_id"];
          var token = responde.headers.get('Authorization') as string;
          sessionStorage.setItem('user_id',user_id);
          sessionStorage.setItem('user_nickname',this.user_nickname);
          this.tokenService.saveToken(token);
          this.login=true;
          this.messageOn=true;
          this.message="Welcome back!!!";
          this.conex.login();
          this.getUserById(Number(sessionStorage.getItem('user_id')));
          this.routerUrl='';
        }
      },error=>{
        if(error.status==404){
          this.messageOn=true;
          this.message="User not found";
          this.routerUrl='../login';

        }else if(error.status==400){
          this.messageOn=true;
          this.message="Incomplete request";
          this.routerUrl='../login';
          //alert("Incomplete request");
        }
      }
    );

  }
  */


}
