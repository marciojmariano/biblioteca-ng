import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AlunoResponse } from '../../../models/aluno.dto';
import { AlunoService } from '../../../services/aluno.service';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { AlunoCreate } from '../create/create';

@Component({
  selector: 'app-list',
  imports: [TableModule, CommonModule, ButtonModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class AlunoList {
  alunos: AlunoResponse[] = [];
  constructor(private alunoService: AlunoService) {
  }
  ngOnInit(): void {
    this.consultarAlunos();
  }

  consultarAlunos() {
    this.alunoService.getAll().subscribe({
      next: alunos => this.alunos = alunos,
      error: erro => {
        console.error(`Ocorreu um erro ao carregar a lista de alunos! ${erro}`)
        alert("Ocorreu um erro ao consultar os alunos!")
      }
    })

  }

  apagar(aluno: AlunoResponse) {
    this.alunoService.delete(aluno.id).subscribe({
      next: () => {
        alert("Aluno apagado com sucesso!");
        this.consultarAlunos(); // Atualiza a lista após a exclusão
      },
      error: erro => {
        console.error(`Ocorreu um erro ao apagar o aluno! ${erro}`)
        alert("Ocorreu um erro ao apagar o aluno!")
      }
    })
  }
}
