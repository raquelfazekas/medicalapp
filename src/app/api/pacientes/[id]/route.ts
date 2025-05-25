import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  const paciente = await prisma.paciente.findUnique({
    where: { id },
  });

  if (!paciente) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(paciente);
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const data = await req.json();

  const paciente = await prisma.paciente.update({
    where: { id },
    data
  });

  return NextResponse.json(paciente);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  await prisma.paciente.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Paciente deletado" });
}
