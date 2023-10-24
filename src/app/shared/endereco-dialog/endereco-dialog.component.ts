import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Endereco } from 'src/app/models/enderecomodel';

@Component({
  selector: 'app-endereco-dialog',
  templateUrl: './endereco-dialog.component.html',
  styleUrls: ['./endereco-dialog.component.scss']
})
export class EnderecoDialogComponent {
  cliente!: Endereco;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Endereco,
    public dialogRef: MatDialogRef<EnderecoDialogComponent>
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
