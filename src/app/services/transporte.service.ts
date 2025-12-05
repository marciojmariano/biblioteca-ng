import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransporteRequest, TransporteResponse } from '../models/transporte.dto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransporteService {
  baseUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = `${environment.apiUrl}/trabalho/transportes`
  }

  getAll(): Observable<TransporteResponse[]> {
    return this.httpClient.get<TransporteResponse[]>(this.baseUrl)
  }
  
  getById(id: number): Observable<TransporteResponse> {
    const url: string = `${this.baseUrl}/${id}`;
    return this.httpClient.get<TransporteResponse>(url);
  }

  delete(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<void>(url)
  }

  update(id: number, form: TransporteRequest): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.put<void>(url, form)
  }

  create(form: TransporteRequest): Observable<void> {
    const url = this.baseUrl;
    return this.httpClient.post<void>(url, form)
  }
}
