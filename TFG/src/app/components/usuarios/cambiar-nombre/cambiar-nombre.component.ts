import { Component , OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-cambiar-nombre',
  templateUrl: './cambiar-nombre.component.html',
  styleUrls: ['./cambiar-nombre.component.css'],
  providers:[UserService]
})
export class CambiarNombreComponent implements OnInit{

  public title: string;
  public usuario: User;
  public status: string;
  users: User[]=[];

  constructor(
    private userService: UserService
  ) {
    this.title = 'Nuevo Nombre';
    this.usuario = new User('','','',0,'');
    this.status ='';

  }


  ngOnInit(){
    const aux = sessionStorage.getItem('Userid');
    let aux2: number;

    if (aux !== null) {
      aux2 = parseInt(aux);

      this.userService.showUser(aux2).subscribe(user => {
        this.users = user;

        //console.log(this.users);

      });


    } else {
      console.log('ESTA OCURRIENDO UN FALLO');
    }

  }

  changeName(form:any){
    this.usuario.email=this.users[0].email;
    //console.log(this.usuario);
    this.userService.newName(this.usuario).subscribe(
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
