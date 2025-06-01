export interface Documento {
    id: string;
    createdAt: Date;
    pacienteId: string;
    type: string;
    title: string;
    conteudo: string;
    dataConsulta: Date;

}