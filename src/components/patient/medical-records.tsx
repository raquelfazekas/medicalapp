/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Calendar, User, Trash, FileText } from "lucide-react";
import { Documento } from "@/types/documentTypes";
import { NewOrEditRecordModal } from "./modals/new-record-modal";
import { DeleteDocument } from "@/actions/prescricaoActions";
import { toast } from "sonner";
import { ConfirmDeleteModal } from "./modals/delete-modal";
import { formatDate } from "@/lib/formatters";
import { PDFModalRLPR } from "./modals/RL_PR-modal";
import { Paciente } from "@prisma/client";

interface MedicalRecordsProps {
  documentos: Documento[];
  paciente: Paciente;
}

export function MedicalRecords({ documentos, paciente }: MedicalRecordsProps) {
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedRecord, setSelectedRecord] = useState<Documento | null>(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<Documento | null>(null);
  const [openPDFModal, setOpenPDFModal] = useState(false);
  const [recordToView, setRecordToView] = useState<Documento | null>(null);

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
        toast.success("Prontuário deletado com sucesso!");
      } catch (error) {
        toast.error("Erro ao deletar Prontuário.");
      } finally {
        setRecordToDelete(null);
        setOpenConfirmModal(false);
      }
    }
  };

  const handleView = (record: Documento) => {
    setRecordToView(record);
    setOpenPDFModal(true);
  };

  if (documentos.length === 0) {
    return (
      <Card className="shadow-sm border-slate-200">
        <CardContent className="p-8 text-center">
          <div className="text-slate-400 mb-4">
            <Calendar className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Nenhum prontuário encontrado
          </h3>
          <p className="text-slate-600 mb-4">
            Clique em &quot;Novo Prontuário&quot; para adicionar o primeiro
            registro.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {documentos.map((record) => (
          <Card
            key={record.id}
            className="shadow-sm border-slate-200 hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {record.type}
                    </h3>
                    <Badge className={getStatusColor("Finalizado")}>
                      Finalizado
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(record.dataConsulta)}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Dra. Raquel de Jesus Fazekas
                    </div>
                  </div>

                  <p className="text-slate-700">{record.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleEdit(record)}
                  >
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 border-green-200 text-green-700 hover:bg-green-50"
                    onClick={() => handleView(record)}
                  >
                    <FileText className="h-4 w-4" />
                    Visualizar PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-red-500 hover:bg-red-400 hover:text-white"
                    onClick={() => {
                      setRecordToDelete(record);
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

      <PDFModalRLPR
        open={openPDFModal}
        onClose={() => setOpenPDFModal(false)}
        paciente={paciente}
        documentos={recordToView}
      />

      <NewOrEditRecordModal
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
