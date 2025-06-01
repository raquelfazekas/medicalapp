import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Calendar, User, FileText } from "lucide-react"

interface DocumentsPDFProps {
  patientId: string
}

// Dados mockados
const mockDocuments = [
  {
    id: "1",
    date: "2024-01-15",
    type: "Receita Simples",
    doctor: "Dr. João Silva",
    description: "Prescrição de medicamentos para tratamento de hipertensão.",
  },
  {
    id: "2",
    date: "2024-01-10",
    type: "Atestado Médico",
    doctor: "Dra. Maria Santos",
    description: "Atestado médico para afastamento de 3 dias.",
  },
  {
    id: "3",
    date: "2024-01-08",
    type: "Solicitação de Exame",
    doctor: "Dr. João Silva",
    description: "Solicitação de exames laboratoriais de rotina.",
  },
]

export function DocumentsPDF({ patientId }: DocumentsPDFProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Receita Simples":
        return "bg-blue-100 text-blue-800"
      case "Receita Especial":
        return "bg-purple-100 text-purple-800"
      case "Atestado Médico":
        return "bg-green-100 text-green-800"
      case "Solicitação de Exame":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (mockDocuments.length === 0) {
    return (
      <Card className="shadow-sm border-slate-200">
        <CardContent className="p-8 text-center">
          <div className="text-slate-400 mb-4">
            <FileText className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhum documento encontrado</h3>
          <p className="text-slate-600 mb-4">
            Clique em "Gerar Documento PDF" para criar receitas, atestados ou solicitações.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {mockDocuments.map((document) => (
        <Card key={document.id} className="shadow-sm border-slate-200 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">{document.type}</h3>
                  <Badge className={getTypeColor(document.type)}>{document.type}</Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(document.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {document.doctor}
                  </div>
                </div>

                <p className="text-slate-700">{document.description}</p>
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
  )
}
