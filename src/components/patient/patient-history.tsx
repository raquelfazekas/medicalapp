/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  User,
  FileText,
  ClipboardList,
  Download,
  History,
} from "lucide-react";
import { Documento } from "@/types/documentTypes";
import { Receita } from "@prisma/client";

interface PatientHistoryProps {
  patientId: string;
  documentos?: Documento[]; // <-- agora pode ser opcional
  relatorios?: Documento[];
  receitas?: Receita[];
}

export function PatientHistory({
  patientId,
  documentos = [],
  relatorios = [],
  receitas = [],
}: PatientHistoryProps) {
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0].split("-").reverse().join("/");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Prontuário":
        return <FileText className="h-4 w-4" />;
      case "Relatório":
        return <ClipboardList className="h-4 w-4" />;
      case "Documento":
        return <Download className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Prontuário":
        return "bg-blue-100 text-blue-800";
      case "Relatório":
        return "bg-purple-100 text-purple-800";
      case "Documento":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const history = [
    ...documentos.map((doc) => ({
      id: doc.id,
      date: doc.dataConsulta,
      type: doc.type,
      title: doc.title,
      doctor: "Dra. Raquel de jesus Fazekas",
      description: "Conteúdo do prontuário.",
      typedoc: "Prontuário",
    })),
    ...relatorios.map((rel) => ({
      id: rel.id,
      date: rel.dataConsulta,
      type: rel.type,
      title: rel.title,
      doctor: "Dra. Raquel de jesus Fazekas",
      description: "Conteúdo do relatório.",
      typedoc: "Relatório",
    })),
    ...receitas.map((rec) => ({
      id: rec.id,
      date: rec.createdAt,
      type: rec.type,
      title: "Documento",
      doctor: "Dra. Raquel de jesus Fazekas",
      description: rec.prescricao,
      typedoc: "Documento",
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (history.length === 0) {
    return (
      <Card className="shadow-sm border-slate-200">
        <CardContent className="p-8 text-center">
          <div className="text-slate-400 mb-4">
            <History className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Nenhum histórico encontrado
          </h3>
          <p className="text-slate-600 mb-4">
            O histórico de consultas aparecerá aqui conforme novos registros
            forem criados.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-600 mb-4">
        Mostrando {history.length} registros no histórico do paciente
      </div>

      {history.map((item, index) => (
        <Card key={item.id} className="shadow-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {/* Timeline indicator */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  {getTypeIcon(item.typedoc)}
                </div>
                {index < history.length - 1 && (
                  <div className="w-px h-8 bg-slate-200 mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.type}
                  </h3>
                  <Badge className={getTypeColor(item.typedoc)}>
                    {item.type}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(item.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {item.doctor}
                  </div>
                </div>

                <p className="text-slate-700">{item.title}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
