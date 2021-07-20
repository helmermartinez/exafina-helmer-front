import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {
  user: string = `${window.sessionStorage.getItem('user')}`;
  nomuser!: string;
  apeluser!: string


  constructor(private router: Router,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    let arrUser = JSON.parse(this.user);
    this.nomuser = arrUser["nombres"];
    this.apeluser = arrUser["apellidos"];
  }

  logout(){
      sessionStorage.removeItem('token');
      this.toastrService.info('Al done! Hope you have an excellent day');
      sessionStorage.removeItem('user');
      this.router.navigate(['/login']);
  }

}
