export interface Endereco {
    id: number;
    tipo: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro?: string;
    cidade: string;
    uf: string;
    idCliente: number;
}