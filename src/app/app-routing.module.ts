import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MailsComponent } from './components/mails/mails.component';
import { ArchivosComponent } from './components/archivos/archivos.component';
import { GlobalComponent } from './global/global.component';
import { AuthGuard } from './auth.guard';

const routesHome: Routes = [
  {path: 'email', component: MailsComponent},
  {path: 'arch', component: ArchivosComponent},
]

const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: GlobalComponent, canActivate: [AuthGuard],children: routesHome}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  GlobalComponent,
  LoginComponent
];
