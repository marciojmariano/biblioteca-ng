import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TransporteRequest, TransporteResponse } from '../../../models/transporte.dto';
import { TransporteService } from '../../../services/transporte.service';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-alterar',
  imports: [FormsModule, InputTextModule, InputMaskModule, DatePickerModule, ButtonModule, InputNumberModule],
  templateUrl: './alter.html',
  styleUrl: './alter.scss',
})
export class TransporteAlter implements OnInit {
  form: TransporteRequest; id: number;
  constructor(private transporteService: TransporteService, private router: Router, private activatedRoute: ActivatedRoute, private messageService: MessageService) {
    this.form = {
      veiculo: '', motorista: '', carga: '', pesoCarga: 0, destino: '', tempoEstimadoHoras: 0
    }
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id")!);
    console.log('ID capturado da URL:', this.id);

  }
  ngOnInit(): void {
    // Busca os dados do transporte na API
    this.carregarTransporte();
  }
  carregarTransporte(): void {
    this.transporteService.getById(this.id).subscribe({
      next: (transporte: TransporteResponse) => {
        console.log('Dados do transporte retornados pela API:', transporte);
        // Preenche o formulário com os dados do transporte
        this.form = {
          veiculo: transporte.veiculo,
          motorista: transporte.motorista,
          carga: transporte.carga,
          pesoCarga: transporte.pesoCarga,
          destino: transporte.destino,
          tempoEstimadoHoras: transporte.tempoEstimadoHoras,
        };
      },
      error: (erro) => {
        console.error(`Erro ao carregar os dados do transporte: ${erro}`);
        alert('Ocorreu um erro ao carregar os dados do transporte.');
      },
    });
  }


  alterar() {
    this.transporteService.update(this.id, this.form).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Transporte alterado com sucesso!', life: 3000 });
        this.router.navigate(['/transporte'])
      },
      error: erro => {
        console.log(`Ocorreu um erro ao alterar o transporte! ${erro}`)
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao alterar o transporte!', life: 3000 });

      }
    })
  }
}
