import { Component , OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers:[UserService]
})
export class CreateUserComponent implements OnInit{
  public title: string;
  public usuario: User;

  constructor(
    private userService: UserService
  ) {
    this.title = 'Crear Usuario';
    this.usuario = new User('','','','');
/*
    private name: string,
    private surname: string,
    private email: string,
    private administrador: number
*/
  }
  ngOnInit(){

  }
  onSubmit(form:any){
    console.log(this.usuario);
    this.userService.saveUser(this.usuario).subscribe(
      response =>{
        console.log(response);
      },error => {
        console.log(<any>error);
      }
    )
  }


}
