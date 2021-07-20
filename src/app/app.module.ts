import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptorService } from './services/token-interceptor.service'; 
import { AuthGuard } from './auth.guard';
import { ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalComponent } from './global/global.component';
import { LoginComponent } from './components/login/login.component';
import { MailsComponent } from './components/mails/mails.component';
import { ArchivosComponent } from './components/archivos/archivos.component';



@NgModule({
  declarations: [
    AppComponent,
    GlobalComponent,
    LoginComponent,
    MailsComponent,
    ArchivosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthGuard,
              {
                provide: HTTP_INTERCEPTORS, 
                useClass: TokenInterceptorService,
                multi: true
              }],
  bootstrap: [AppComponent]
})
export class AppModule { }
