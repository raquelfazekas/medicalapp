import { Suspense } from "react";
import { PatientHeader } from "@/components/patient/patient-header";
import { PatientTabs } from "@/components/patient/patient-tabs";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { GetPaciente } from "@/actions/pacienteActions";
import { GetDocumentos, GetDocumentosPR } from "@/actions/prescricaoActions";
import { GetPdfRecords } from "@/actions/domentoActions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PatientProfilePage({ params }: PageProps) {
  const { id } = await params;

  const [patient, documentos, relatorios, receitas] = await Promise.all([
    GetPaciente(id),
    GetDocumentos(id),
    GetDocumentosPR(id),
    GetPdfRecords(id)
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Pacientes", href: "/dashboard/pacientes" },
            { label: patient.nomeCompleto, href: `/pacientes/${id}` },
          ]}
        />

        <PatientHeader patient={patient} />

        <Suspense fallback={<div>Carregando...</div>}>
          <PatientTabs
            receitas={receitas}
            pacitente={patient}
            relatorios={relatorios}
            documentos={documentos}
            patientId={id}
          />
        </Suspense>
      </div>
    </div>
  );
}