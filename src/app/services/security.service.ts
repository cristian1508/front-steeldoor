import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/authResponse';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SignUpCredentials } from '../interfaces/signUpCredentials';
import { UserCredentials } from '../interfaces/userCredentials';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  ApiUrl = environment.url
  private readonly tokenKey = 'token';
  private readonly expirationKey = 'expirationKey';
  private readonly roleField = 'role';

  constructor(private _httpClient : HttpClient) { 
    
  }

  IsLogged(): boolean {
    const token = localStorage.getItem(this.tokenKey);
  
    if (!token) return false;
  
    const expiration = localStorage.getItem(this.expirationKey);

    let expirationDate: Date | null = null;

    if (expiration !== null) {
      expirationDate = new Date(expiration);
    } else {
      expirationDate = null;
    }

    const isExpired = expirationDate && expirationDate < new Date();
  
    if (isExpired) {
      this.LogOut();
      return false;
    }
    return true;
  }

  GetRole(): string{
    return this.GetFieldOfJWT(this.roleField);
  }

  GetFieldOfJWT(field: string): string {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return '';
    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }

  SignUp(signUpCredentials : SignUpCredentials): Observable<AuthResponse>{
    return this._httpClient.post<AuthResponse>(this.ApiUrl + 'account/create', signUpCredentials)
  }

  Login(userCredentials : UserCredentials): Observable<AuthResponse>{
    return this._httpClient.post<AuthResponse>(this.ApiUrl + 'login', userCredentials)
  }

  LogOut(){
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationKey);
  }
  
  SaveToken(authResponse : AuthResponse){
    localStorage.setItem(this.tokenKey, authResponse.token);
    localStorage.setItem(this.expirationKey, authResponse.expiration.toString());
  }
  
}
