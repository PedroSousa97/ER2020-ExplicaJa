import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../Home/home.component';
import { RegisterComponent } from '../Register/register.component';
import { LoginComponent } from '../Login/login.component';
import { AdminComponent } from '../Admin/admin.component';
import { RHComponent } from '../RH/rh.component';
import { CFOComponent } from '../CFO/cfo.component';
import { ExplicadorComponent } from '../Explicador/explicador.component';
import { ExplicandoComponent } from '../Explicando/explicando.component';
import { EncarregadoComponent } from '../Encarregado/encarregado.component';
import { DisciplinaComponent } from '../Disciplina/disciplina.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'cfo', component: CFOComponent},
  { path: 'rh', component: RHComponent},
  { path: 'explicador', component: ExplicadorComponent},
  { path: 'explicando', component: ExplicandoComponent},
  { path: 'encarregado', component: EncarregadoComponent},
  { path: 'disciplina/:id/:nome/:ano', component: DisciplinaComponent}

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
