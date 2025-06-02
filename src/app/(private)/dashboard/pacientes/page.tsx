/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/pacientes/page.tsx
import { Button } from "@/components/ui/button";
import { Plus, ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { PatientTable } from "@/components/tables/PatientTable";
import { getPacientes, deletePaciente } from "@/actions/pacienteActions";
import { redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumb";

export default async function PacientesPage() {
  const patients = await getPacientes();

  async function handleEdit(id: string) {
    "use server";
    redirect(`/dashboard/pacientes/edit/${id}`);
  }

  async function handleDelete(id: string) {
    "use server";
    try {
      await deletePaciente(id);
      return { success: true, message: "Paciente excluído com sucesso" };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Erro ao excluir paciente",
      };
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
         <Breadcrumbs
                items={[
                  { label: "Dashboard", href: "/dashboard/medico" },
                  { label: "Pacientes", href: "/dashboard/pacientes" },
                ]}
              />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Pacientes
            </h1>
            <p className="text-gray-600">
              Gerencie os pacientes do seu consultório
            </p>
          </div>
          <div className="space-x-3">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="w-full sm:w-auto hover:bg-gray-100"
              >
                <ArrowBigLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <Link href="/dashboard/pacientes/create">
              <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700">
                <Plus className="mr-2 h-4 w-4" />
                Novo Paciente
              </Button>
            </Link>
          </div>
        </div>
        <PatientTable
          patients={patients}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
