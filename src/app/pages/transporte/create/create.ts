import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TransporteRequest } from '../../../models/transporte.dto';
import { TransporteService } from '../../../services/transporte.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-create',
  imports: [FormsModule, InputTextModule, InputMaskModule, DatePickerModule, ButtonModule,InputNumberModule],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class TransporteCreate {
  form: TransporteRequest;
  @Output() transporteCadastro = new EventEmitter<TransporteRequest>();
  constructor(private transporteService: TransporteService, private router: Router, private messageService: MessageService) {
    this.form = {
      veiculo: '', motorista: '', carga: '', pesoCarga: 0, destino: '', tempoEstimadoHoras: 0
    }
  }

    cadastrar() {
    this.transporteService.create(this.form).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Transporte cadastrado com sucesso!', life: 3000 });
        this.router.navigate(['/transporte'])
      },
      error: erro => {
        console.log(`Ocorreu um erro ao cadastrar o transporte! ${erro}`)
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao cadastrar o transporte!', life: 3000 });

      }
    })
  }

}
