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
  public status: string;

  constructor(
    private userService: UserService
  ) {
    this.title = 'Registrarse';
    this.usuario = new User('','','',0,'');
    this.status ='';

  }
  ngOnInit(){

  }

  addUser(form:any){
    console.log(this.usuario);
    this.userService.saveUser(this.usuario).subscribe(
      response  =>{
        console.log(response);
            form.reset();
            this.status='success';

      },error => {
        console.log(<any>error);
        this.status='failed';

      }
    );
  }


}
