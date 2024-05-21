import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from '../global.service';
import { Position } from '../../models/position.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  url!: string;
  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.url = `${globalService.domainUrl}/Positions`;
  }
  getAllPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.url)
  }
  getPositionById(id: number): Observable<Position> {
    return this.http.get<Position>(`${this.url}/${id}`)
  }


  addPosition(position: Position): Observable<Position> {
    return this.http.post<Position>(this.url, position)
  }


}
