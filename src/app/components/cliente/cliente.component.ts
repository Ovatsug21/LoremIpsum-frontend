import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/clientemodel';
import { ClienteService } from 'src/app/services/clienteservice';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})

export class ClienteComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Nome', 'Data de Nascimento', 'Sexo', 'Ações'];
  dataSource: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(clientes => {
      this.dataSource = clientes;
      console.log(clientes);
    });
  }

  verEnderecos(clienteId: number): void {
    this.router.navigate([`/cliente/${clienteId}/enderecos`]);
  }
}
