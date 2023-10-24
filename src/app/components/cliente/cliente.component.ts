import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/clientemodel';
import { ClienteService } from 'src/app/services/clienteservice';
import { ClienteDialogComponent } from 'src/app/shared/cliente-dialog/cliente-dialog.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  providers: [ClienteService]
})

export class ClienteComponent implements OnInit {

  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['Id', 'Nome', 'Data de Nascimento', 'Sexo', 'Ações'];
  dataSource: Cliente[] = [];

  constructor(
    public clienteService: ClienteService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.clienteService.getClientes()
      .subscribe((data: Cliente[]) => {
        console.log('data: ', data);
        this.dataSource = data;
      });
  }

  verEnderecos(clienteId: number): void {
    this.router.navigate([`/cliente/${clienteId}/enderecos`]);
  }

  openDialog(cliente: Cliente | null): void {
    const dialogRef = this.dialog.open(ClienteDialogComponent, {
      width: '250px',
      data: cliente === null ? {
        nome: '',
        dataNascimento: '',
        sexo: ''
      } : {
        id: cliente.id,
        nome: cliente.nome,
        dataNascimento: cliente.dataNascimento,
        sexo: cliente.sexo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result);
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.clienteService.updateCliente(result.id, result)
            .subscribe((data: Cliente) => {
              const index = this.dataSource.findIndex(p => p.id === data.id);
              this.dataSource[index] = data;
              this.table.renderRows();
            });
        } else {
          this.clienteService.postCliente(result)
            .subscribe((data: Cliente) => {
              this.dataSource.push(data);
              this.table.renderRows();
            });
        }
      }
    });
  }

  updateCliente(cliente: Cliente): void {
    console.log(cliente)
    this.openDialog(cliente);
  }

  deleteCliente(id: number) {
    this.clienteService.deleteCliente(id)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p.id !== id);
      });
  }
}
