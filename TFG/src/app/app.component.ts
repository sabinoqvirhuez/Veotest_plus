import {Component, OnInit} from '@angular/core';
import { hideHTML } from './services/hidehtml';
import {UserService} from "./services/user.service";
import {User} from "./models/user";
import { Router } from '@angular/router';
import {HttpResponse} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";


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

    this.servicio.loginUser(this.usuario).subscribe(
      (res: HttpResponse<any>) => {
        if(res.status==200) {
          console.log("200 de status")
          console.log(res);
          this.toggleHTML();
          this.router.navigateByUrl('/usuarios');
          var responseObj = res.body.resp as { Userid: number };
          var id = responseObj.Userid;
          var token = res.body.token as string;
          console.log(id,token);
        }
      },
      error => {
        console.error(error);
        console.log("tiro el error por login()");
      }
    );
  }

}
