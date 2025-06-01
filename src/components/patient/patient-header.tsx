import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { calcularIdade, formatDate } from "@/lib/formatters";
import { PatientPageProps } from "@/types/patientTypes";
import { CalendarDays, User, FileText, Phone, Mail } from "lucide-react";

type PatientHeaderProps = {
  patient: PatientPageProps;
};

export function PatientHeader({ patient }: PatientHeaderProps) {

  return (
    <Card className="mb-8 shadow-sm border-slate-200">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Avatar e Nome */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 lg:h-20 lg:w-20">
              <AvatarImage src={""} alt={patient.nomeCompleto} />
              <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-700">
                <User />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl lg:text-xl font-bold text-slate-900 mb-1">
                {patient.nomeCompleto}
              </h1>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-slate-600">
                  <FileText className="h-3 w-3 mr-1" />
                  {patient.id}
                </Badge>
              </div>
            </div>
          </div>

          {/* Informações do Paciente */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:ml-8">
            <div className="flex items-center gap-2 text-slate-600">
              <CalendarDays className="h-4 w-4" />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Data de Nascimento
                </p>
                <p className="text-[0.85em] font-semibold text-slate-900">
                  {formatDate(patient.dataNascimento)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <User className="h-4 w-4" />
              <div>
                <p className="text-[0.85em] text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Idade / Gênero
                </p>
                <p className="text-[0.85em] font-semibold text-slate-900">
                  {calcularIdade(patient.dataNascimento)} anos • {patient.genero}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <Phone className="h-4 w-4" />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Telefone
                </p>
                <p className="text-[0.85em] font-semibold text-slate-900">
                  {patient.telefone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <Mail className="h-4 w-4" />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Email
                </p>
                <p className="text-[0.85em] font-semibold text-slate-900 truncate">
                  {patient.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
