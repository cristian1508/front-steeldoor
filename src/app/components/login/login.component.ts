import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/interfaces/userCredentials';
import { SecurityService } from 'src/app/services/security.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  form: FormGroup;
  errors : string[]= [];
  userCredentials : UserCredentials = {
    email: '',
    password: ''
  }; 

  constructor(private _fb: FormBuilder,
    private _securityService : SecurityService,
    private _utilitiesService : UtilitiesService,
    private _router : Router
    ){
    
      this.form = this._fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }


login() {

  this.userCredentials = {
    email: this.form.value.email,
    password: this.form.value.password
  }

  this._securityService.Login(this.userCredentials).subscribe(
    response => {
      this._securityService.SaveToken(response);
      this._router.navigate(['/'])
    }, errors => this.errors = this._utilitiesService.ParseErrAPI(errors));
  }

}
