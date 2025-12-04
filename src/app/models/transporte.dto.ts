export interface TransporteResponse {
    id: number;
    veiculo: string;
    motorista: string;
    carga: string;
    pesoCarga: number;
    destino: string;
    tempoEstimadoHoras: number;
}

export interface TransporteRequest {
    veiculo: string;
    motorista: string;
    carga: string;
    pesoCarga: number;
    destino: string;
    tempoEstimadoHoras: number;
}