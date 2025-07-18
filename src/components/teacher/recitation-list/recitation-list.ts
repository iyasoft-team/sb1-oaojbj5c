import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChip, MatChipsModule } from '@angular/material/chips';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { RecitationService } from '../../../services/recitation.service';
import { Recitation, SessionDay, Status } from '../../../models/Sessions.model';
import { SessionDayService } from '../../../services/session-day.service';
import { MatMenu, MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-recitation-list',
  imports: [MatChipsModule,FormsModule,CommonModule,MatIconModule,MatMenuModule],
  templateUrl: './recitation-list.html',
  styleUrl: './recitation-list.css'
})
export class RecitationList {
  participants : Recitation[] = [] ; 
  session : SessionDay  ; 
  status : Status ; 
  constructor(private activeRouter : ActivatedRoute,private recitationService  : RecitationService, private router : Router , private sessionDayService : SessionDayService){}
 ngOnInit() {
    const sessionId = this.activeRouter.snapshot.params["id"];
    console.log('Session ID from route:', sessionId);
    this.sessionDayService.GetSessionDayByID(sessionId).subscribe({
      next(value) {
       this.session = value ; 
       console.log(this.session) ; 
      },
       error: (err) => {
    console.error('Failed to fetch recitations:', err);
  }
    })
    this.recitationService.getRecitationsBySessionID(sessionId).subscribe({
  next: (recitations) => {
    // handle the response here
    this.participants = recitations;
  },
  error: (err) => {
    console.error('Failed to fetch recitations:', err);
  }
});
}
StartTasmii(participant : any)
{
  this.router.navigate(['teacher/Tasmii',participant.id])
}
getStatusLabel(status: number): string {
  switch (status) {
    case 0: return 'Pending';
    case 1: return 'Finished';
    case 2: return 'Canceled';
    default: return 'Unknown';
  }
}
updateStatus(participant: any, newStatus: number) {
  participant.status = newStatus;
}
}


