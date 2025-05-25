import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const paciente = await prisma.paciente.findUnique({
    where: { id: params.id },
  });

  if (!paciente) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(paciente);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();

  const paciente = await prisma.paciente.update({
    where: { id: params.id },
    data: {
      nome: data.nome,
      telefone: data.telefone,
      email: data.email,
    },
  });

  return NextResponse.json(paciente);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.paciente.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "Paciente deletado" });
}
