import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { Emails } from '../models/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  Url = 'http://localhost:3200/api/mail'
  constructor(private http: HttpClient) { }

   //Read Mail
   readmail(id: number): Observable<Emails[]> {
    return this.http.get<Emails[]>(this.Url+"/"+id );
  }

  //Send Mail
  sendmail(mail:Emails){
    return this.http.post<Emails[]>(this.Url+'/send', mail);   
  }

  sendrealmail(mail:Emails){
    return this.http.post<Emails[]>(this.Url+'/email', mail);
  }

  
}
