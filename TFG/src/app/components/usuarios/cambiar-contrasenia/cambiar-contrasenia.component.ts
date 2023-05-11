import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css'],
  providers:[UserService]
})
export class CambiarContraseniaComponent implements OnInit{

  public title: string;
  public usuario: User;
  public status: string;
  users: User[]=[];

  constructor(
    private userService: UserService
  ) {
    this.title = 'Nueva Contraseña';
    this.usuario = new User('','','',0,'');
    this.status ='';

  }
  ngOnInit(){
    const aux = sessionStorage.getItem('Userid');
    let aux2: number;

    if (aux !== null) {
      aux2 = parseInt(aux);
      //console.log("llego hasta aqui")
      this.userService.showUser(aux2).subscribe(user => {
        this.users = user;
       // console.log(this.users);

      });


    } else {
      console.log('ESTA OCURRIENDO UN FALLO');
    }

  }

  changePassword(form:any){
    this.usuario.email=this.users[0].email;

    this.userService.newPassword(this.usuario).subscribe(
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
