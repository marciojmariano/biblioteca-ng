import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlunoRequest, AlunoResponse } from '../models/aluno.dto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  baseUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.baseUrl = `${environment.apiUrl}/escola/alunos`
  }

  getAll(): Observable<AlunoResponse[]> {
    return this.httpClient.get<AlunoResponse[]>(this.baseUrl)
  }

  getById(id: number): Observable<AlunoResponse> {
    const url: string = `${this.baseUrl}/${id}`;
    return this.httpClient.get<AlunoResponse>(url);
  }

  delete(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<void>(url)
  }

  update(id: number, form: AlunoRequest): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.put<void>(url, form)
  }

  create(form: AlunoRequest): Observable<void> {
    const url = this.baseUrl;
    return this.httpClient.post<void>(url, form)
  }
}
