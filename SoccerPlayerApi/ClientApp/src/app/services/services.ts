import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {soccerPlayer} from '../models/soccerPlayer.model';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Services {

  private path = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllPlayers(): Observable<any> {
    return this.httpClient.get<any[]>(this.path + "/Players/GetPlayers");
  }

  editPlayer(player: soccerPlayer): any {
    const header = new HttpHeaders().set("Content-type", "application/json");

    return this.httpClient.put(this.path + "/Players/Put", JSON.stringify(player), {headers: header})
  }

  createNewPlayer(player: soccerPlayer): any {
    const header = new HttpHeaders().set("Content-type", "application/json");

    return this.httpClient.post(this.path + "/Players/Post", JSON.stringify(player), {headers: header})
  }

  deletePlayer(player: soccerPlayer): any {
    return this.httpClient.delete(this.path + "/Players/Delete" + player.playerId)
  }
}
