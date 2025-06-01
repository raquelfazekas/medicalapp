/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, FileText, ClipboardList, Download, History } from "lucide-react"

interface PatientHistoryProps {
  patientId: string
}

// Dados mockados do histórico completo
const mockHistory = [
  {
    id: "1",
    date: "2024-01-15",
    type: "Prontuário",
    title: "Consulta de Rotina",
    doctor: "Dr. João Silva",
    description: "Consulta de rotina para acompanhamento geral de saúde.",
  },
  {
    id: "2",
    date: "2024-01-15",
    type: "Relatório",
    title: "Relatório Cardiológico",
    doctor: "Dra. Maria Santos",
    description: "Avaliação cardiológica completa com ECG e ecocardiograma.",
  },
  {
    id: "3",
    date: "2024-01-10",
    type: "Documento",
    title: "Atestado Médico",
    doctor: "Dra. Maria Santos",
    description: "Atestado médico para afastamento de 3 dias.",
  },
  {
    id: "4",
    date: "2024-01-08",
    type: "Prontuário",
    title: "Consulta Especializada",
    doctor: "Dra. Maria Santos",
    description: "Avaliação cardiológica com solicitação de exames complementares.",
  },
  {
    id: "5",
    date: "2024-01-08",
    type: "Documento",
    title: "Solicitação de Exame",
    doctor: "Dr. João Silva",
    description: "Solicitação de exames laboratoriais de rotina.",
  },
]

export function PatientHistory({ patientId }: PatientHistoryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Prontuário":
        return <FileText className="h-4 w-4" />
      case "Relatório":
        return <ClipboardList className="h-4 w-4" />
      case "Documento":
        return <Download className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Prontuário":
        return "bg-blue-100 text-blue-800"
      case "Relatório":
        return "bg-purple-100 text-purple-800"
      case "Documento":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (mockHistory.length === 0) {
    return (
      <Card className="shadow-sm border-slate-200">
        <CardContent className="p-8 text-center">
          <div className="text-slate-400 mb-4">
            <History className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhum histórico encontrado</h3>
          <p className="text-slate-600 mb-4">
            O histórico de consultas aparecerá aqui conforme novos registros forem criados.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-600 mb-4">
        Mostrando {mockHistory.length} registros no histórico do paciente
      </div>

      {mockHistory.map((item, index) => (
        <Card key={item.id} className="shadow-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {/* Timeline indicator */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  {getTypeIcon(item.type)}
                </div>
                {index < mockHistory.length - 1 && <div className="w-px h-8 bg-slate-200 mt-2" />}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
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

                <p className="text-slate-700">{item.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
