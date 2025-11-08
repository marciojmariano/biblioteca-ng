import { Component } from '@angular/core';
import { AlunoService } from '../../../services/aluno.service';
import { AlunoRequest } from '../../../models/aluno.dto';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [FormsModule, InputTextModule, InputMaskModule, DatePickerModule, ButtonModule],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class AlunoCreate {
  form: AlunoRequest;
  constructor(private alunoService: AlunoService, private router:Router) {
    this.form = {
      nome: '', sobrenome: '', dataNascimento: null, cpf: ''
    }
  }

  cadastrar(){
  this.alunoService.create(this.form).subscribe({
    next : ()=> {
      alert("Aluno cadastrado com sucesso!")
      this.router.navigate(['/alunos'])
    },
    error: erro=>{
      console.log(`Ocorreu um erro ao cadastrar o aluno! ${erro}`)
      alert("Ocorreu um erro ao cadastrar o aluno!")

    }
  })
}


}
