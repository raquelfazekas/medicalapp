"use client";

import { Search, Edit, Trash2, Phone, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Patient } from "@/types/patientTypes";

type PatientTableProps = {
  patients: Patient[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function PatientTable({
  patients,
  onEdit,
  onDelete,
}: PatientTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const filteredPatients = patients.filter((patient) =>
    patient.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  return (
    <Card className="shadow-lg">
      <CardHeader className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="text-xl">Lista de Pacientes</CardTitle>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-100" />
          <Input
            placeholder="Buscar paciente..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 rounded-md border-blue-300 focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-700">
                  Nome do Paciente
                </TableHead>
                <TableHead className="text-gray-700">
                  Data de Nascimento
                </TableHead>
                <TableHead className="text-gray-700">Telefone</TableHead>
                <TableHead className="text-gray-700">Última Consulta</TableHead>
                <TableHead className="text-gray-700">Status</TableHead>
                <TableHead className="text-right text-gray-700">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPatients.map((patient) => (
                <TableRow
                  onClick={() =>
                    router.push(`/dashboard/pacientes/${patient.id}`)
                  }
                  key={patient.id}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {patient.nomeCompleto}
                        </div>
                        <div className="text-sm text-gray-500">
                          {calculateAge(patient.dataNascimento)} anos
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {formatDate(patient.dataNascimento)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {patient.telefone || "Não informado"}
                    </div>
                  </TableCell>
                  <TableCell>
                    {patient.ultimaConsulta
                      ? formatDate(patient.ultimaConsulta)
                      : "Nenhuma"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        patient.status === "Ativo" ? "default" : "secondary"
                      }
                      className={
                        patient.status === "Ativo"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(patient.id)}
                        className="h-8 w-8 p-0 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(patient.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-4 md:hidden">
          {currentPatients.map((patient) => (
            <Card key={patient.id} className="p-4 shadow-sm">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{patient.nomeCompleto}</div>
                      <div className="text-sm text-gray-500">
                        {calculateAge(patient.dataNascimento)} anos
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      patient.status === "Ativo" ? "default" : "secondary"
                    }
                    className={
                      patient.status === "Ativo"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {patient.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>
                      Nascimento: {formatDate(patient.dataNascimento)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{patient.telefone || "Não informado"}</span>
                  </div>
                  <div className="text-gray-600">
                    Última consulta:{" "}
                    {patient.ultimaConsulta
                      ? formatDate(patient.ultimaConsulta)
                      : "Nenhuma"}
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(patient.id)}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(patient.id)}
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Mostrando {startIndex + 1} a{" "}
              {Math.min(endIndex, filteredPatients.length)} de{" "}
              {filteredPatients.length} pacientes
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="hover:bg-indigo-50"
              >
                Anterior
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "hover:bg-indigo-50"
                    }
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="hover:bg-indigo-50"
              >
                Próximo
              </Button>
            </div>
          </div>
        )}

        {filteredPatients.length === 0 && (
          <div className="py-8 text-center">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhum paciente encontrado
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm
                ? "Tente ajustar sua busca"
                : "Nenhum paciente cadastrado"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
