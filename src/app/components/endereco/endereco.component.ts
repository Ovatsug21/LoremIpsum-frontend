import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Endereco } from 'src/app/models/enderecomodel';
import { EnderecoService } from 'src/app/services/enderecoservice';
import { EnderecoDialogComponent } from 'src/app/shared/endereco-dialog/endereco-dialog.component';
import { ClienteService } from 'src/app/services/clienteservice';
import { Cliente } from 'src/app/models/clientemodel';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss'],
  providers: [EnderecoService]
})
export class EnderecoComponent implements OnInit {

  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] =
    ['Tipo', 'Cep', 'Logradouro', 'Numero', 'Complemento', 'Bairro', 'Cidade', 'Uf', 'Ações'];
  dataSource: Endereco[] = [];
  clienteId!: number;
  dataNascimento = new Date().toISOString();
  dadoscliente!: Cliente;

  constructor(
    private enderecoService: EnderecoService,
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clienteId = +params['id'];

      this.enderecoService.getEnderecosCliente(this.clienteId).subscribe(enderecos => {
        this.dataSource = enderecos;
        this.cdr.detectChanges();
        console.log(enderecos);
      });

      this.clienteService.getClienteId(this.clienteId)
        .subscribe((cliente: Cliente) => {
          this.dadoscliente = cliente;
        });
    });
  }

  openDialog(endereco: Endereco | null): void {
    const dialogRef = this.dialog.open(EnderecoDialogComponent, {
      width: '250px',
      data: endereco === null ? {
        tipo: '',
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        idCliente: this.clienteId,
        cliente: {
          id: this.clienteId,
          nome: this.dadoscliente.nome,
          dataNascimento: this.dadoscliente.dataNascimento,
          sexo: this.dadoscliente.sexo
        }
      } : {
        id: endereco.id,
        tipo: endereco.tipo,
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        numero: endereco.numero,
        complemento: endereco.complemento,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        uf: endereco.uf,
        idCliente: endereco.idCliente,
        cliente: {
          id: this.clienteId,
          nome: this.dadoscliente.nome,
          dataNascimento: this.dadoscliente.dataNascimento,
          sexo: this.dadoscliente.sexo
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result);
        if (result.id) {
          this.enderecoService.updateEndereco(result)
            .subscribe(() => {
              const index = this.dataSource.findIndex(p => p.id === result.id);
              if (index !== -1) {
                this.dataSource[index] = result;
                this.table.renderRows();
              }
            });
        } else {
          console.log('id do cliente', result.idCliente);
          this.enderecoService.postEndereco(result.idCliente, result)
            .subscribe((data: Endereco) => {
              this.dataSource.push(data);
              this.table.renderRows();
            });
        }
      }
    });
  }

  updateEndereco(endereco: Endereco): void {
    console.log(endereco)
    this.openDialog(endereco);
  }

  deleteEndereco(id: number) {
    this.enderecoService.deleteEndereco(id)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p.id !== id);
      });
  }
}
