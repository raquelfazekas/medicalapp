import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  console.log(data);

  // Checa se já existe
  const existingPaciente = await prisma.paciente.findUnique({
    where: { cpf: data.cpf },
  });

  if (existingPaciente) {
    return NextResponse.json({ error: "Paciente já cadastrado com este CPF" }, { status: 400 });
  }

  const paciente = await prisma.paciente.create({
    data: {
      ...data,
      dataNascimento: new Date(data.dataNascimento),
    },
  });

  return NextResponse.json(paciente);
}

export async function GET() {
  const pacientes = await prisma.paciente.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(pacientes);
}
