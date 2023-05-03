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
        this.router.navigateByUrl('/home');

      },
      error => {

        console.log(error);
        console.log("tiro el error por login()");
      }
    );
  }



}
