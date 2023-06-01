import { Component, OnInit } from '@angular/core';
import {KeyService} from "../../../services/key.service";
import {Router} from "@angular/router";
import{Key} from "../../../models/key"

@Component({
  selector: 'app-create-key',
  templateUrl: './create-key.component.html',
  styleUrls: ['./create-key.component.css']
})
export class CreateKeyComponent implements OnInit{

  public key: Key;
  public status: string;
  constructor(private service: KeyService) {
    this.key= new Key(0,'');
    this.status='';

  }

  ngOnInit() {
  }

  newKey(form:any){
    const flag = sessionStorage.getItem('Userid');
    let aux2: number;
    if (flag !== null) {
      aux2 = parseInt(flag);
      this.key.Userid= aux2;
      this.service.saveKey(this.key).subscribe(
        response  =>{
          console.log(response);
          form.reset();
          this.status='success';

        },error => {
          console.log(<any>error);
          this.status='failed';

        }
      );
    } else {
      this.status='failed';
    }
  }

}
