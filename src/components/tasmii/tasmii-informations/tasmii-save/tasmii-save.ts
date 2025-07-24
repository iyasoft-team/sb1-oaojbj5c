import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RecitationService } from '../../../../services/recitation.service';
import { Recitation, Status } from '../../../../models/Sessions.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasmii-save',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule,MatIcon],
  templateUrl: './tasmii-save.html',
  styleUrl: './tasmii-save.css'
})
export class TasmiiSave {
  remarque: string = '';

  constructor(
    public dialogRef: MatDialogRef<TasmiiSave>,
    private recitationService: RecitationService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { recitationId: number }
  ) {}

  cancel() {
    this.dialogRef.close(null);
  }

  save() {
    const recitationId = this.data.recitationId;

    if (!recitationId || isNaN(recitationId)) {
      console.error('Invalid recitation ID');
      return;
    }

    this.recitationService.updateRecitationStatus(recitationId, Status.Finished).subscribe({
      next: () => {
        console.log('Successfully changed recitation status to Finished');
        this.dialogRef.close('success');
        // this.router.navigate(['/teacher/sessions']);
      },
      error: err => {
        console.error('Failed to update status', err);
      }
    });
  }
}
