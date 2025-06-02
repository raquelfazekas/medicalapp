/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Calendar, User, FileText, Trash } from "lucide-react";
import { Paciente, Receita } from "@prisma/client";
import { toast } from "sonner";
import { ConfirmDeleteModal } from "./modals/delete-modal";
import { DeleteReceita } from "@/actions/domentoActions";
import { useState } from "react";
import { PDFModal } from "./modals/PDF-modal";
import { formatDate } from "@/lib/formatters";

interface DocumentsPDFProps {
  patientId: string;
  receitas: Receita[];
  paciente: Paciente;
}

export function DocumentsPDF({
  patientId,
  receitas,
  paciente,
}: DocumentsPDFProps) {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<Receita | null>(null);
  const [openPDFModal, setOpenPDFModal] = useState(false);
  const [recordToView, setRecordToView] = useState<Receita | null>(null);

  const handleView = (receita: Receita) => {
    setRecordToView(receita);
    setOpenPDFModal(true);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Receita Simples":
        return "bg-blue-100 text-blue-800";
      case "Receita Especial":
        return "bg-purple-100 text-purple-800";
      case "Atestado Médico":
        return "bg-green-100 text-green-800";
      case "Solicitação de Exame":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDelete = async () => {
    if (recordToDelete) {
      try {
        await DeleteReceita(recordToDelete.id);
        toast.success("Receita deletada com sucesso!");
      } catch (error) {
        toast.error("Erro ao deletar a Receita.");
      } finally {
        setRecordToDelete(null);
        setOpenConfirmModal(false);
      }
    }
  };

  if (receitas.length === 0) {
    return (
      <Card className="shadow-sm border-slate-200">
        <CardContent className="p-8 text-center">
          <div className="text-slate-400 mb-4">
            <FileText className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Nenhum documento encontrado
          </h3>
          <p className="text-slate-600 mb-4">
            Clique em &quot;Gerar Documento PDF&quot; para criar receitas,
            atestados ou solicitações.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {receitas.map((document) => (
          <Card
            key={document.id}
            className="shadow-sm border-slate-200 hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {document.type}
                    </h3>
                    <Badge className={getTypeColor(document.type)}>
                      {document.type}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(document.createdAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {"Dra. Raquel de Jesus Fazekas"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 border-green-200 text-green-700 hover:bg-green-50"
                    onClick={() => handleView(document)}
                  >
                    <FileText className="h-4 w-4" />
                    Visualizar PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-red-500 hover:bg-red-400 hover:text-white"
                    onClick={() => {
                      setRecordToDelete(document);
                      setOpenConfirmModal(true);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                    Deletar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <PDFModal
        open={openPDFModal}
        onClose={() => setOpenPDFModal(false)}
        receita={recordToView}
        paciente={paciente}
      />

      <ConfirmDeleteModal
        open={openConfirmModal}
        onConfirm={handleDelete}
        onCancel={() => setOpenConfirmModal(false)}
      />
    </>
  );
}
