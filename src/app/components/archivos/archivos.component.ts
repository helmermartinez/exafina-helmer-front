import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Archivos } from 'src/app/models/archivo';
import { RealArch } from 'src/app/models/realarch';
import { ArchivosService } from 'src/app/services/archivos.service';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {

  archForm = new FormGroup({
    nombre : new FormControl('', [Validators.required, Validators.minLength(5)]),
    tipo : new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  user: string = `${window.sessionStorage.getItem('user')}`;
  id!: number;

  public archivos : any = [];

  archivo: Archivos = new Archivos();
  

  arch: Archivos[]=[];
  
  constructor(private router: Router,
              private archService: ArchivosService) { }

  ngOnInit(): void {
    let arrUser = JSON.parse(this.user);
    this.id = arrUser["idusuario"];
    this.readArchivos();
  }

  readArchivos(){
    this.archService.readarchvio(this.id).subscribe(data=>{
      this.arch=data;
    })
  }

  uploadArch(){
    this.archivo.idusuario = this.id;
    this.archService.sendmail(this.archivo).subscribe(date =>{
      Swal.fire({title: 'Completed!',text: 'All Right the document has been successfully uplaoded!',icon: 'success',showConfirmButton: false,timer: 1800,})
      this.readArchivos();
      this.ngOnInit();
      this.archForm.reset();
    })
  }

  get nombre(){ return this.archForm.get('nombre');}
  get tipo(){ return this.archForm.get('tipo');}

  capturar(e:any) {
    const capturados = e.target.files
    this.archivos.push(capturados)
  }

  
  uploadRealArch(){
      try {
        const formData = new FormData();
        this.archivos.forEach((archivo: string) => {
          formData.append('file', archivo)
          
        })
      this.archService.uploadarch(this.archivos).subscribe(data =>{
        console.log("Registrado?" + data);
      });
    }catch (e) {
      console.log('ERROR', e);
    }
  }
}
