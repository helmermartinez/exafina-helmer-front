import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  Url = 'http://localhost:3200/api/auth'

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario:Usuario){
    return this.http.post<any>(this.Url+'/', usuario);
  }

  loggedIn(){
    return !!sessionStorage.getItem('token');
  }

  getToken(){
    return sessionStorage.getItem('token');
  }

}
