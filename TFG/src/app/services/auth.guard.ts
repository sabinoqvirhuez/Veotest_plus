import { Injectable } from '@angular/core';
import {  CanActivate } from '@angular/router';
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service:UserService,
              private router : Router) {
  }
  canActivate():boolean{

    if(this.service.loggedIn()){
      return true;
    }else{
      console.log("pasa por aqui");
      this.router.navigate(['/app']);
      return false;
    }

  }

}
