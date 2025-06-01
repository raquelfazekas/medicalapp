/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Calendar, User, FileText } from "lucide-react";
import { Receita } from "@prisma/client";

interface DocumentsPDFProps {
  patientId: string;
  receitas: Receita[];
}

export function DocumentsPDF({ patientId, receitas }: DocumentsPDFProps) {
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0].split("-").reverse().join("/");
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
                >
                  <Download className="h-4 w-4" />
                  Baixar PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
