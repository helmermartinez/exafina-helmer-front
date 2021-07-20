import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { Archivos } from '../models/archivo';
import { RealArch } from '../models/realarch';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {
  Url = 'http://localhost:3200/api/archive'

  constructor(private http: HttpClient) { }

   //Read Archive
   readarchvio(id: number): Observable<Archivos[]> {
    return this.http.get<Archivos[]>(this.Url+"/"+id );
  }

  //Upload Archive
  sendmail(arch:Archivos){
    return this.http.post<Archivos[]>(this.Url+'/subir', arch);   
  }

   //Upload RealArchive
   uploadarch(arch:RealArch){
    return this.http.post<RealArch[]>(this.Url+'/upload', arch);   
  }
}
