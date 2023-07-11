import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SecurityService } from 'src/app/services/security.service';
import { SignUpCredentials } from 'src/app/interfaces/signUpCredentials';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  errors : string[]= [];
  signUpCredentials : SignUpCredentials = {
    email: '',
    password: '',
    passwordConfirm: ''
  }; 

  constructor(private _fb: FormBuilder, 
    private _snackBar: MatSnackBar,
    private _securityService : SecurityService,
    private _utilitiesService : UtilitiesService,
    private _router : Router
    ){
    
      this.form = this._fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required],
      passwordConfirm : ['', Validators.required]

    })
}

signUp() {
  this.signUpCredentials = {
    email: this.form.value.email,
    password: this.form.value.password,
    passwordConfirm: this.form.value.passwordConfirm
  }

  if (this.signUpCredentials.password != this.signUpCredentials.passwordConfirm) {
    this.passError();
  } else {
    this._securityService.SignUp(this.signUpCredentials).subscribe(
      response => {
        this._securityService.SaveToken(response);
        this._router.navigate(['login'])
      }, errors => this.errors = this._utilitiesService.ParseErrAPI(errors));
  }
}

  passError(){
    this._snackBar.open("Passwords do not match", '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

}


