import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { EmailService } from 'src/app/services/email.service';
import { Emails } from 'src/app/models/email';

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.css']
})
export class MailsComponent implements OnInit {

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  mailform = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    message : new FormControl('', Validators.required)
  })
  
  user: string = `${window.sessionStorage.getItem('user')}`;
  id!: number;

  mail: Emails = new Emails();

  mails: Emails[]=[];
  constructor(private router: Router,
              private emaliService: EmailService,
              private toatrServices: ToastrService) { }

  ngOnInit(): void {
    let arrUser = JSON.parse(this.user);
    this.id = arrUser["idusuario"];
    this.readMail();
  }

  readMail(){
    this.emaliService.readmail(this.id).subscribe((data)=>{
      this.mails = data;
    })
  }

  sendMail(){
    this.mail.idusuario = this.id;
    this.emaliService.sendmail(this.mail).subscribe(data=>{
    this.mailform.reset();
    })
  }

  sendRealMail(){
    if(this.mailform.valid){
      this.emaliService.sendrealmail(this.mail).subscribe(data=>{
        Swal.fire({title: 'Completed!',text: 'All Right the mail has been successfully send!',icon: 'success',showConfirmButton: false,timer: 1800,})
        this.sendMail();
        this.readMail();
        this.ngOnInit();
      })
    }else{
      console.log("No valid")
    }
  }

  get email(){ return this.mailform.get('email');}
  get message(){ return this.mailform.get('message');}


}
