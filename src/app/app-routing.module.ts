import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { EnderecoComponent } from './components/endereco/endereco.component';

const routes: Routes = [
  { path: '', component: ClienteComponent },
  { path: 'cliente/:id/enderecos', component: EnderecoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
