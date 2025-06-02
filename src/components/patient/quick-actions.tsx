"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, FileText, ClipboardList, FileDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewOrEditRecordModal } from "./modals/new-record-modal";
import { NewReportModal } from "./modals/new-report-modal";
import { NewDocumentModal } from "./modals/new-document-modal";
import { Paciente } from "@prisma/client";

interface PatientTabsProps {
  pacitente: Paciente;
}

export function QuickActions({ pacitente }: PatientTabsProps) {
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [documentType, setDocumentType] = useState<string>("");

  const handleDocumentClick = (type: string) => {
    setDocumentType(type);
    setShowDocumentModal(true);
  };

  return (
    <>
      <Card className="shadow-sm border-slate-200">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => setShowRecordModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Novo Prontuário
            </Button>

            <Button
              onClick={() => setShowReportModal(true)}
              variant="outline"
              className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <ClipboardList className="h-4 w-4" />
              Novo Relatório
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-green-200 text-green-700 hover:bg-green-50"
                >
                  <FileDown className="h-4 w-4" />
                  Gerar Documento PDF
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem
                  onClick={() => handleDocumentClick("receita-simples")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Receita Simples
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDocumentClick("receita-especial")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Receita Especial
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDocumentClick("atestado")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Atestado Médico
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDocumentClick("solicitacao-exame")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Solicitação de Exame
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Modais */}
      <NewOrEditRecordModal
        mode="create"
        open={showRecordModal}
        onOpenChange={setShowRecordModal}
      />
      <NewReportModal
        mode="create"
        open={showReportModal}
        onOpenChange={setShowReportModal}
      />
      <NewDocumentModal
        pacitente={pacitente}
        open={showDocumentModal}
        onOpenChange={setShowDocumentModal}
        documentType={documentType}
      />
    </>
  );
}
