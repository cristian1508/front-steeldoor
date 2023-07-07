import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  form: FormGroup;

  constructor(private _fb: FormBuilder, private _snackBar: MatSnackBar){
    this.form = this._fb.group({
      user : ['', Validators.required, Validators.email],
      password : ['', Validators.required],
    })
}

login(){
  const user = this.form.value.user;
  const password = this.form.value.password;

  if(user == 'lobo' && password == 'lopez'){

  }else{
    this.error();
  }
  }

  error(){
    this._snackBar.open("Invalid credentials", '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })

}
}
