/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Download,
  Calendar,
  User,
  ClipboardList,
  Trash,
} from "lucide-react";
import { Documento } from "@/types/documentTypes";
import { NewReportModal } from "./modals/new-report-modal";
import { ConfirmDeleteModal } from "@/components/patient/modals/delete-modal";
import { useState } from "react";
import { DeleteDocument } from "@/actions/prescricaoActions";
import { toast } from "sonner";
import { formatDate } from "@/lib/formatters";

interface MedicalReportsProps {
  documentos: Documento[];
}

export function MedicalReports({ documentos }: MedicalReportsProps) {
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedRecord, setSelectedRecord] = useState<Documento | null>(null);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<Documento | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Finalizado":
        return "bg-green-100 text-green-800";
      case "Em andamento":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEdit = (record: Documento) => {
    setSelectedRecord(record);
    setModalMode("edit");
    setOpenModal(true);
  };

  const handleDelete = async () => {
    if (recordToDelete) {
      try {
        await DeleteDocument(recordToDelete.id);
        toast.success("Relatório deletado com sucesso!");
      } catch (error) {
        toast.error("Erro ao deletar relatório.");
      } finally {
        setRecordToDelete(null);
        setOpenConfirmModal(false);
      }
    }
  };

  if (documentos.length === 0) {
    return (
      <Card className="shadow-sm border-slate-200">
        <CardContent className="p-8 text-center">
          <div className="text-slate-400 mb-4">
            <ClipboardList className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Nenhum relatório encontrado
          </h3>
          <p className="text-slate-600 mb-4">
            Clique em &quot;Novo Relatório&quot; para adicionar o primeiro
            relatório médico.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {documentos.map((report) => (
          <Card
            key={report.id}
            className="shadow-sm border-slate-200 hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {report.type}
                    </h3>
                    <Badge className={getStatusColor("Finalizado")}>
                      {"Finalizado"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(report.dataConsulta)}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {"Dra. Raquel de Jesus Fazekas"}
                    </div>
                  </div>

                  <p className="text-slate-700">{report.title}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleEdit(report)}
                  >
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-red-500 hover:bg-red-400 hover:text-white"
                    onClick={() => {
                      setRecordToDelete(report);
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

      <NewReportModal
        open={openModal}
        onOpenChange={setOpenModal}
        mode={modalMode}
        initialData={selectedRecord}
      />

      <ConfirmDeleteModal
        open={openConfirmModal}
        onConfirm={handleDelete}
        onCancel={() => setOpenConfirmModal(false)}
      />
    </>
  );
}
