/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { prisma } from "@/lib/prisma";
import { patientSchema } from "@/lib/schemas";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function createPaciente(data: z.infer<typeof patientSchema>) {
  try {
    const validatedData = patientSchema.parse(data);
    const patient = await prisma.paciente.create({
      data: {
        ...validatedData,
        dataNascimento: new Date(validatedData.dataNascimento),
      },
    });
    revalidatePath("/dashboard/pacientes");
    return patient;
  } catch (error: any) {
    throw new Error(error.message || "Erro ao criar paciente");
  }
}

export async function updatePaciente(id: string, data: z.infer<typeof patientSchema>) {
  try {
    const validatedData = patientSchema.parse(data);
    const patient = await prisma.paciente.update({
      where: { id },
      data: {
        ...validatedData,
        dataNascimento: new Date(validatedData.dataNascimento),
      },
    });
    revalidatePath("/dashboard/pacientes");
    return patient;
  } catch (error: any) {
    throw new Error(error.message || "Erro ao atualizar paciente");
  }
}

export async function GetPaciente(id: string) {
  try {
    const paciente = await prisma.paciente.findUnique({
      where: { id },
    });
    if (!paciente) throw new Error("Paciente não encontrado");
    return paciente;
  } catch (error: any) {
    throw new Error(error.message || "Erro ao buscar paciente");
  }
}

export async function deletePaciente(id: string) {
  try {
    await prisma.paciente.delete({
      where: { id },
    });
    revalidatePath("/dashboard/pacientes");
    return { success: true };
  } catch (error: any) {
    throw new Error(error.message || "Erro ao excluir paciente");
  }
}

export async function getPacientes() {
  const pacientes = await prisma.paciente.findMany({
    include: {
      Documento: {
        select: {
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  const pacientesComStatus = pacientes.map((paciente) => {
    const ultimaConsulta = paciente.Documento[0]?.createdAt || null;
    const status = ultimaConsulta
      ? (new Date().getTime() - new Date(ultimaConsulta).getTime()) / (1000 * 60 * 60 * 24) < 365
        ? "Ativo"
        : "Inativo"
      : "Inativo";

    return {
      id: paciente.id,
      nomeCompleto: paciente.nomeCompleto,
      nomeSocial: paciente.nomeSocial,
      dataNascimento: paciente.dataNascimento.toISOString(),
      cpf: paciente.cpf,
      genero: paciente.genero,
      estadoCivil: paciente.estadoCivil,
      numeroFilhos: paciente.numeroFilhos,
      profissao: paciente.profissao,
      escolaridade: paciente.escolaridade,
      naturalidade: paciente.naturalidade,
      religiao: paciente.religiao,
      email: paciente.email,
      telefone: paciente.telefone,
      endereco: paciente.endereco,
      createdAt: paciente.createdAt.toISOString(),
      ultimaConsulta: ultimaConsulta ? ultimaConsulta.toISOString() : null,
      status: status as "Ativo" | "Inativo",
    };
  });

  return pacientesComStatus;
}