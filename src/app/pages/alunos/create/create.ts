import { Component, Output, EventEmitter } from '@angular/core';
import { AlunoService } from '../../../services/aluno.service';
import { AlunoRequest } from '../../../models/aluno.dto';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create',
  imports: [FormsModule, InputTextModule, InputMaskModule, DatePickerModule, ButtonModule, Toast],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class AlunoCreate {
  form: AlunoRequest;
  @Output() alunoCadastrado = new EventEmitter<AlunoRequest>();
  constructor(private alunoService: AlunoService, private router: Router, private messageService: MessageService ) {
    this.form = {
      nome: '', sobrenome: '', dataNascimento: null, cpf: ''
    }
  }

  cadastrar() {
    this.alunoService.create(this.form).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Aluno cadastrado com sucesso!', life: 3000 });
        this.router.navigate(['/alunos'])
      },
      error: erro => {
        console.log(`Ocorreu um erro ao cadastrar o aluno! ${erro}`)
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao cadastrar o aluno!', life: 3000 });

      }
    })
  }
}
