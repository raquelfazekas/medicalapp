export interface Patient {
  id: string;
  nomeCompleto: string;
  nomeSocial?: string | null;
  dataNascimento: string;
  cpf: string;
  genero: string;
  estadoCivil: string;
  numeroFilhos: number;
  profissao: string;
  escolaridade: string;
  naturalidade: string;
  religiao: string;
  email?: string | null;
  telefone?: string | null;
  endereco: string;
  ultimaConsulta?: string | null;
  status: "Ativo" | "Inativo";
  createdAt?: string;
  updatedAt?: string;
}

export interface PatientPageProps {
  id: string;
  nomeCompleto: string;
  nomeSocial?: string | null;
  dataNascimento: Date;
  cpf: string;
  genero: string;
  estadoCivil: string;
  numeroFilhos: number;
  profissao: string;
  escolaridade: string;
  naturalidade: string;
  religiao: string;
  email?: string | null;
  telefone?: string | null;
  endereco: string;
  ultimaConsulta?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}