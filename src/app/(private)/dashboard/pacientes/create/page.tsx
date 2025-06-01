// app/dashboard/pacientes/cadastrar/page.tsx

import PatientForm from "@/components/forms/PatientForm";

export default function CadastrarPacientePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <PatientForm />
    </div>
  );
}
