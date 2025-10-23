import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {soccerPlayer} from '../../models/soccerPlayer.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Services} from '../../services/services';

@Component({
  selector: 'app-player-form',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './player-form.html',
  styleUrl: './player-form.css'
})
export class PlayerForm {
  newPlayer: soccerPlayer | undefined;
  isEdit: boolean = false;

  constructor(public dialogRef: MatDialogRef<PlayerForm>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar, private services: Services) { }

    newPlayerForm = new FormGroup({
      name: new FormControl(''),
      jerseyNumber: new FormControl(null)
    });

  ngOnInit(): void {
    if (this.data != null) {
      this.newPlayerForm = new FormGroup({
        name: new FormControl(this.data.player.name),
        jerseyNumber: new FormControl(this.data.player.jerseyNumber)
      });
      this.isEdit = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close(0);
  }

  async onSubmit() {
    if (!this.isEdit) {
      this.newPlayer = new soccerPlayer(0, this.newPlayerForm.value.name!, this.newPlayerForm.value.jerseyNumber!);
      await this.services.createNewPlayer(this.newPlayer).subscribe((res: any) => {
        this.dialogRef.close(0)
      });
    } else {
      this.newPlayer = new soccerPlayer(this.data.player.playerId, this.newPlayerForm.value.name!, this.newPlayerForm.value.jerseyNumber!);
      await this.services.editPlayer(this.newPlayer).subscribe((res: any) => {
        this.dialogRef.close(0)
      });
    }
  }
}
