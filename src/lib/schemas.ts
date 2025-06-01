// Schema de validação com Zod
import { isValidCPF } from '@/lib/formatters';
import z from 'zod'

export const patientSchema = z.object({
    nomeCompleto: z
        .string()
        .min(1, "Nome completo é obrigatório")
        .min(2, "Nome deve ter pelo menos 2 caracteres"),
    nomeSocial: z.string().optional(),
    dataNascimento: z.string().min(1, "Data de nascimento é obrigatória"),
    cpf: z
        .string()
        .min(1, "CPF é obrigatório")
        .refine((cpf) => isValidCPF(cpf), "CPF inválido"),
    genero: z.string().min(1, "Gênero é obrigatório"),
    estadoCivil: z.string().min(1, "Estado civil é obrigatório"),
    numeroFilhos: z.number().min(0, "Número de filhos deve ser 0 ou maior"),
    profissao: z.string().min(1, "Profissão é obrigatória"),
    escolaridade: z.string().min(1, "Escolaridade é obrigatória"),
    naturalidade: z.string().min(1, "Naturalidade é obrigatória"),
    religiao: z.string().min(1, "Religião é obrigatória"),
    email: z.string().email("Email inválido").optional().or(z.literal("")),
    telefone: z.string().optional(),
    endereco: z.string().min(1, "Endereço é obrigatório"),
});

export type PatientFormData = z.infer<typeof patientSchema>;