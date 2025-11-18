import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlunoRequest, AlunoResponse } from '../models/aluno.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  constructor(
    private httpClient: HttpClient
  ) { }
  getAll(): Observable<AlunoResponse[]> {
    const url = "https://api.franciscosensaulas.com/api/v1/escola/alunos"
    return this.httpClient.get<AlunoResponse[]>(url)
  }

  getById(id: number): Observable<AlunoResponse> {
  return this.httpClient.get<AlunoResponse>(`https://api.franciscosensaulas.com/api/v1/escola/alunos/${id}`);
}

  delete(id: number): Observable<void> {
    const url = `https://api.franciscosensaulas.com/api/v1/escola/alunos/${id}`
    return this.httpClient.delete<void>(url)
  }

  update(id: number, form: AlunoRequest): Observable<void> {
    const url = `https://api.franciscosensaulas.com/api/v1/escola/alunos/${id}`
    return this.httpClient.put<void>(url, form)
  }

  create(form: AlunoRequest): Observable<void> {
    const url = "https://api.franciscosensaulas.com/api/v1/escola/alunos"
    return this.httpClient.post<void>(url, form)
  }
}
