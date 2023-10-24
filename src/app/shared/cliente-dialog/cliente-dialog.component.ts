import { Component, Inject, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/clientemodel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.scss']
})
export class ClienteDialogComponent {
  cliente!: Cliente;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Cliente,
    public dialogRef: MatDialogRef<ClienteDialogComponent>
  ) { }

  ngOnInit(): void {

    if (this.data.id != null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  Cancel(): void {
    this.dialogRef.close();
  }
}
