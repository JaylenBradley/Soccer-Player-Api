import { Routes } from '@angular/router';
import { PlayerList } from './player-list/player-list';

export const routes: Routes = [
  {path: '', component: PlayerList, pathMatch: "full"}
];
