import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  user!: User;

  constructor(private router: Router,
              private authService: AuthService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  log(){
    this.authService.login(this.usuario).subscribe(
      res =>{
        sessionStorage.setItem('token', res.accessToken);
        let datos = JSON.parse(atob(res.accessToken.split(".")[1]));
        console.log(datos); 
        this.user = new User();
        this.user.idusuario = datos.usuario.idusuario;
        this.user.username = datos.usuario.username;
        this.user.estado = datos.usuario.estado;
        this.user.nombres = datos.usuario.nombres;
        this.user.apellidos = datos.usuario.apellidos;
        sessionStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['/home']);
        this.toastrService.success('Hi '+this.user.nombres +' Grate to have you back...!');
      },
      err =>{
        this.toastrService.error('Sorry, Username or Password Incorrect');
      }
    )
  }

}
