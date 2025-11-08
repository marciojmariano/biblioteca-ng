export interface AlunoResponse{
    id: number;
    nome: string;
    sobrenome: string;
    dataNascimento: Date;
    cpf: string;
}

export interface AlunoRequest{
    nome: string;
    sobrenome: string;
    dataNascimento: Date | null;
    cpf: string;
}