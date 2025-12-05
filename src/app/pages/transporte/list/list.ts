import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TransporteResponse } from '../../../models/transporte.dto';
import { TransporteService } from '../../../services/transporte.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list',
  imports: [TableModule, CommonModule, ButtonModule, RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class TransporteList {
  transportes: TransporteResponse[] = [];
  constructor(private transporteService: TransporteService, private confirmationService: ConfirmationService, private messageService: MessageService) {
  }
  ngOnInit(): void {
    this.consultarTransportes();
  }

  consultarTransportes() {
    this.transporteService.getAll().subscribe({
      next: transportes => this.transportes = transportes,
      error: erro => {
        console.error(`Ocorreu um erro ao carregar a lista de tranportes! ${erro}`)
        alert("Ocorreu um erro ao consultar a lista de transportes!!")
      }
    })
  }

  confirmarParaApagar(event: Event, transporte: TransporteResponse) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja mesmo excluir? Essa ação é irreversível',
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
        this.apagar(transporte);
      },
    });
  }

  apagar(transporte: TransporteResponse) {
    this.transporteService.delete(transporte.id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Transporte excluído com sucesso!', life: 3000 });
        this.consultarTransportes(); // Atualiza a lista após a exclusão
      },
      error: erro => {
        console.error(`Ocorreu um erro ao excluir o transporte! ${erro}`)
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao excluir o transporte!', life: 3000 });
      }
    })
  }
}
