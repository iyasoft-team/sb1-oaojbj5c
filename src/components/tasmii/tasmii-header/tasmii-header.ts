import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RecitationInfoComponent } from '../tasmii-informations/recitation-Info/recitation-info.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TasmiiHomework } from '../tasmii-informations/tasmii-homework/tasmii-homework';
import { TasmiiSave } from '../tasmii-informations/tasmii-save/tasmii-save';
import { Router } from '@angular/router';
import { Recitation } from '../../../models/Sessions.model';
import { RecitationService, UpdateHomeworkDto } from '../../../services/recitation.service';

@Component({
  selector: 'app-tasmii-header',
  imports: [
    FormsModule,
    MatButtonModule,
    MatSlideToggleModule,
    RecitationInfoComponent,
    TasmiiHomework,
    MatDialogModule,
    TasmiiSave
  ],
  standalone : true ,
  templateUrl: './tasmii-header.html',
  styleUrl: './tasmii-header.css'
})
export class TasmiiHeader {
    @Input() recitation : Recitation = null ; 
    sessionId : number ; 
    studentName: string = "Nom de l'étudiant";
    isRevision: boolean = false;
    isTajweedSelected : boolean = false 
    constructor(private dialog: MatDialog , private router : Router , private recitationService : RecitationService) {}
ngOnInit() {
    this.sessionId = this.recitation.sessionId
  }
openModalHomework() {
    const dialogRef = this.dialog.open(TasmiiHomework, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.recitation) {
        const homework: UpdateHomeworkDto = {
          scheduledSurah: result.surahNumber,
          scheduledAyah: result.start // or result.end if preferred
        };

        this.recitationService.updateRecitationHomework(this.recitation.id, homework).subscribe(() => {
          console.log('✅ Homework updated successfully');
        });
      }
    });
  }
openSaveRecitationModal() {
  const dialogRef = this.dialog.open(TasmiiSave, {
    width: '500px',
    data: {recitationId: this.recitation.id}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Remarks saved:', result);
      this.router.navigateByUrl(`/teacher/Recitation/${this.sessionId}`);
    }
  });
}


}
