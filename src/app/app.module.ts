import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { EnderecoComponent } from './components/endereco/endereco.component';
import { ClienteFormComponent } from './components/cliente-form/cliente-form.component';
import { EnderecoFormComponent } from './components/endereco-form/endereco-form.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    EnderecoComponent,
    ClienteFormComponent,
    EnderecoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
