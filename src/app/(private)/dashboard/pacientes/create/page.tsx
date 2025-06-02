// app/dashboard/pacientes/cadastrar/page.tsx

import PatientForm from "@/components/forms/PatientForm";
import { Breadcrumbs } from "@/components/ui/breadcrumb";

export default function CadastrarPacientePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Pacientes", href: "/dashboard/pacientes" },
            { label: "Cadastrar Paciente", href: "/dashboard/pacientes/create" },
          ]}
        />
        <PatientForm />
      </div>
    </div>
  );
}
