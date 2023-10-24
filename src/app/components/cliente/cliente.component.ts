import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/clientemodel';
import { ClienteService } from 'src/app/services/clienteservice';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})

export class ClienteComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Nome', 'Data de Nascimento', 'Sexo'];
  dataSource: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(clientes => {
      this.dataSource = clientes;
      console.log(clientes);
    });
  }
}
