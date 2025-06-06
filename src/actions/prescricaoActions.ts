/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma, } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function createDocumento(title: string, content: string, reportType: string, typeDoc: string, reportDate: string, userId: string) {
    try {
        const documento = await prisma.documento.create({
            data: {
                pacienteId: userId,
                type: reportType,
                dataConsulta: new Date(reportDate),
                title: title,
                typeDoc: typeDoc,
                conteudo: content,
            },
        });

        revalidatePath(`/dashboard/pacientes/${userId}`);

        return documento;
    } catch (error: any) {
        console.error("Erro ao criar documento:", error);
        throw new Error(error.message || "Erro ao criar documento");
    }
}


export async function GetDocumentos(pacienteId: string) {
    try {
        const documentos = await prisma.documento.findMany({
            where: {
                pacienteId: pacienteId,
                typeDoc: "RL",
            }
        });
        return documentos;
    } catch (error: any) {
        console.error("Erro ao Buscar documento:", error);
        throw new Error(error.message || "Erro ao Buscar documento");
    }
}


export async function GetDocumentosPR(pacienteId: string) {
    try {
        const documentos = await prisma.documento.findMany({
            where: {
                pacienteId: pacienteId,
                typeDoc: "PR",
            }
        });
        return documentos;
    } catch (error: any) {
        console.error("Erro ao Buscar documento:", error);
        throw new Error(error.message || "Erro ao Buscar documento");
    }
}

export async function updateDocumento(
    documentoId: string,
    title: string,
    content: string,
    reportType: string,
    typeDoc: string,
    reportDate: string
) {
    try {
        const documento = await prisma.documento.update({
            where: {
                id: documentoId,
            },
            data: {
                title: title,
                conteudo: content,
                type: reportType,
                typeDoc: typeDoc,
                dataConsulta: new Date(reportDate),
            },
        });

        revalidatePath(`/dashboard/documentos/${documentoId}`);

        return documento;
    } catch (error: any) {
        console.error("Erro ao atualizar documento:", error);
        throw new Error(error.message || "Erro ao atualizar documento");
    }
}


export async function DeleteDocument(id: string) {

    try {
        await prisma.documento.delete({
            where: { id }
        })
        revalidatePath(`/dashboard/pacientes/${id}`);
        return
    } catch (error: any) {
        console.error("Erro ao deletar documento:", error);
        throw new Error(error.message || "Erro ao deletar documento");
    }

}