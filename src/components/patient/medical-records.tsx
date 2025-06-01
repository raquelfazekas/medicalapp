import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Download, Calendar, User } from "lucide-react";
import { Documento } from "@/types/documentTypes";

interface MedicalRecordsProps {
  documentos: Documento[];
}

export function MedicalRecords({ documentos }: MedicalRecordsProps) {
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0].split("-").reverse().join("/");
  };

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
                    {"Finalizado"}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(record.dataConsulta)}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {"Dra. Raquel de Jesus Fazekas"}
                  </div>
                </div>

                <p className="text-slate-700">{record.title}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Eye className="h-4 w-4" />
                  Ver
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
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
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
