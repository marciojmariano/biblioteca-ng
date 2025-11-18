import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { AlunoRequest, AlunoResponse } from '../../../models/aluno.dto';
import { AlunoService } from '../../../services/aluno.service';

@Component({
  selector: 'app-alterar',
  imports: [FormsModule, InputTextModule, InputMaskModule, DatePickerModule, ButtonModule],
  templateUrl: './alterar.html',
  styleUrl: './alterar.scss',
})
export class Alterar implements OnInit {
  form: AlunoRequest; id: number;
  constructor(private alunoService: AlunoService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.form = {
      nome: '', sobrenome: '', dataNascimento: null, cpf: ''
    }
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!);
    console.log('ID capturado da URL:', this.id);

  }
  ngOnInit(): void {
    // Busca os dados do aluno na API
    this.carregarAluno();
  }
  carregarAluno(): void {
    this.alunoService.getById(this.id).subscribe({
      next: (aluno: AlunoResponse) => {
        console.log('Dados do aluno retornados pela API:', aluno);
        // Preenche o formulário com os dados do aluno
        this.form = {
          nome: aluno.nome,
          sobrenome: aluno.sobrenome,
          dataNascimento: aluno.dataNascimento ? new Date(aluno.dataNascimento) : null, // Converte para Date
          cpf: aluno.cpf,
        };
      },
      error: (erro) => {
        console.error(`Erro ao carregar os dados do aluno: ${erro}`);
        alert('Ocorreu um erro ao carregar os dados do aluno.');
      },
    });
  }


  alterar() {
    this.alunoService.update(this.id, this.form).subscribe({
      next: () => {
        alert("Aluno alterado com sucesso!")
        this.router.navigate(['/alunos'])
      },
      error: erro => {
        console.log(`Ocorreu um erro ao alterar o aluno! ${erro}`)
        alert("Ocorreu um erro ao alterar o aluno!")

      }
    })
  }
}
