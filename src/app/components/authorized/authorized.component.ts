import { Component, Input, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})


export class AuthorizedComponent implements OnInit{

  

  constructor(private _securityService: SecurityService){  }

  @Input()
  role!: string;

  ngOnInit(): void{}

  IsLogged(): boolean{
    if(this.role){
      return this._securityService.GetRole() === this.role
    }else{
      return this._securityService.IsLogged();
    }
  
  }

  // IsAuthorized(): boolean{
  //   return this.IsLogged() && this._securityService.GetRole() === this.role;
  // }
  
}


