import { Component } from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {soccerPlayer} from '../models/soccerPlayer.model';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Services} from '../services/services';
import {PlayerForm} from './player-form/player-form';

@Component({
  selector: 'app-player-list',
  imports: [
    MatTable,
    MatColumnDef,
    MatButton,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatRowDef,
    MatCellDef,
    MatHeaderRowDef,
    MatIcon
  ],
  templateUrl: './player-list.html',
  styleUrl: './player-list.css'
})
export class PlayerList {

  dataSources!: MatTableDataSource<soccerPlayer>
  displayedColumns: string[] = ["name", 'jerseyNumber', "Actions"];

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private services: Services) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  async getPlayers() {
    console.log('this gets the players from the db')
    await this.services.getAllPlayers().subscribe((res: soccerPlayer[] | undefined) => {
      this.dataSources = new MatTableDataSource(res);
    });
  }

  addPlayer() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "450px";

    let dialogRef = this.dialog.open(PlayerForm, dialogConfig)

    dialogRef.afterClosed().subscribe(res => {
      if (res != 0) {
        console.log('The dialog was closed but player was created');

        this._snackBar.open("Player was created successfully", "Close", {
          duration: 2000,
        });
        this.getPlayers()
      }
      else {
        console.log("The dialog was closed");
      }
    });
  }

  editPlayer(player: soccerPlayer) {
    console.log(player.name + "player to edit")

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "450px";
    dialogConfig.data = {
      player: player
    }

    let dialogRef = this.dialog.open(PlayerForm, dialogConfig)

    dialogRef.afterClosed().subscribe(res => {
      if (res != 0) {
        console.log('The dialog was closed but player was edited');

        this._snackBar.open("Player was edited successfully", "Close", {
          duration: 2000,
        });
        this.getPlayers()
      }
      else {
        console.log("The dialog was closed");
      }
    });
  }

  async deletePlayer(player: soccerPlayer) {
    console.log(player.name + "player to delete")

    await this.services.deletePlayer(player).subscribe((res: any) => {
      this._snackBar.open("Player was deleted successfully", "Close", {
        duration: 2000,
      });
    });
  }
}
