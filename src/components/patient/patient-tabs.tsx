"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuickActions } from "./quick-actions";
import { MedicalRecords } from "./medical-records";
import { MedicalReports } from "./medical-reports";
import { DocumentsPDF } from "./documents-pdf";
import { PatientHistory } from "./patient-history";
import { FileText, ClipboardList, FileDown, History } from "lucide-react";
import { Documento } from "@/types/documentTypes";
import { Paciente, Receita } from "@prisma/client";

interface PatientTabsProps {
  patientId: string;
  documentos: Documento[];
  relatorios: Documento[];
  pacitente: Paciente;
  receitas: Receita[];
}

export function PatientTabs({
  relatorios,
  patientId,
  documentos,
  pacitente,
  receitas,
}: PatientTabsProps) {
  const [activeTab, setActiveTab] = useState("prontuarios");

  return (
    <div className="space-y-6">
      {/* Ações Rápidas */}
      <QuickActions pacitente={pacitente} />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-white border border-slate-200 p-1">
          <TabsTrigger
            value="prontuarios"
            className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Prontuários</span>
          </TabsTrigger>
          <TabsTrigger
            value="relatorios"
            className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
          >
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Relatórios</span>
          </TabsTrigger>
          <TabsTrigger
            value="documentos"
            className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
          >
            <FileDown className="h-4 w-4" />
            <span className="hidden sm:inline">Documentos</span>
          </TabsTrigger>
          <TabsTrigger
            value="historico"
            className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
          >
            <History className="h-4 w-4" />
            <span className="hidden sm:inline">Histórico</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prontuarios" className="mt-6">
          <MedicalRecords documentos={relatorios} />
        </TabsContent>

        <TabsContent value="relatorios" className="mt-6">
          <MedicalReports documentos={documentos} />
        </TabsContent>

        <TabsContent value="documentos" className="mt-6">
          <DocumentsPDF paciente={pacitente} receitas={receitas} patientId={patientId} />
        </TabsContent>

        <TabsContent value="historico" className="mt-6">
          <PatientHistory
            patientId={patientId}
            documentos={documentos}
            relatorios={relatorios}
            receitas={receitas}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
