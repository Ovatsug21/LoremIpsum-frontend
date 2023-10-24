import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Endereco } from 'src/app/models/enderecomodel';
import { EnderecoService } from 'src/app/services/enderecoservice';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {
  displayedColumns: string[] =
    ['Tipo', 'Cep', 'Logradouro', 'Numero', 'Complemento', 'Bairro', 'Cidade', 'Uf'];

  dataSource: Endereco[] = [];
  //clienteId: number;

  constructor(
    private enderecoService: EnderecoService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const clienteId = +params['id'];

      this.enderecoService.getEnderecosCliente(clienteId).subscribe(enderecos => {
        this.dataSource = enderecos;
        this.cdr.detectChanges();
        console.log(enderecos);
      });
    });
  }
}
