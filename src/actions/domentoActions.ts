/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma, } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function createPdfRecord(prescricao: string, type: string, createdAt: Date, userId: string) {
    try {
        const documento = await prisma.receita.create({
            data: {
                pacienteId: userId,
                prescricao,
                type,
                createdAt
            },
        });

        revalidatePath(`/dashboard/pacientes/${userId}`);

        return documento;
    } catch (error: any) {
        console.error("Erro ao criar documento:", error);
        throw new Error(error.message || "Erro ao criar documento");
    }
}


export async function GetPdfRecords(pacienteId: string) {
    try {
        const documentos = await prisma.receita.findMany({
            where: {
                pacienteId: pacienteId,
            }
        });
        return documentos;
    } catch (error: any) {
        console.error("Erro ao Buscar documento:", error);
        throw new Error(error.message || "Erro ao Buscar documento");
    }
}