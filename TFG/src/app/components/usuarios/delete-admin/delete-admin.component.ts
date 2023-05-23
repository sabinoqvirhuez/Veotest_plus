import { Component , OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-delete-admin',
  templateUrl: './delete-admin.component.html',
  styleUrls: ['./delete-admin.component.css'],
  providers:[UserService]
})
export class DeleteAdminComponent implements OnInit{

  public title: string;
  public usuario: User;
  public status: string;


  constructor(
    private userService: UserService
  ) {
    this.title = 'Borrar usuario del portal';
    this.usuario = new User('','','',0,'');
    this.status ='';


  }

  ngOnInit() {

  }
  borrarUsuarioAdmin(form:any){


    this.userService.deleteUser(this.usuario.email).subscribe(
      response  =>{
        //console.log(response);
        form.reset();
        this.status='success';

      },error => {
        console.log(<any>error);
        this.status='failed';

      }
    );
  }
}
