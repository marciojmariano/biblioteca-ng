import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AlunoResponse } from '../../../models/aluno.dto';
import { AlunoService } from '../../../services/aluno.service';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { AlunoCreate } from '../create/create';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list',
  imports: [TableModule, CommonModule, ButtonModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class AlunoList {
  alunos: AlunoResponse[] = [];
  constructor(private alunoService: AlunoService, private confirmationService: ConfirmationService, private messageService: MessageService) {
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

  confirmarParaApagar(event: Event, aluno: AlunoResponse) {

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja mesmo excluir?',
      header: 'Ação perigosa!',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Excluir',
        severity: 'danger',
      },
      accept: () => {
        this.apagar(aluno);
      },
    });
  }

  apagar(aluno: AlunoResponse) {
    this.alunoService.delete(aluno.id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Aluno excluído com sucesso!', life: 3000 });
        this.consultarAlunos(); // Atualiza a lista após a exclusão
      },
      error: erro => {
        console.error(`Ocorreu um erro ao apagar o aluno! ${erro}`)
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao excluir o aluno!', life: 3000 });
      }
    })
  }
}
