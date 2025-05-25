"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Phone,
  Calendar,
  User,
  ArrowBigLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { redirect } from "next/navigation";

// Dados de exemplo dos pacientes
const pacientesData = [
  {
    id: 1,
    nome: "Maria Silva Santos",
    dataNascimento: "1985-03-15",
    telefone: "(11) 99999-1234",
    ultimaConsulta: "2024-01-15",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "João Carlos Oliveira",
    dataNascimento: "1978-07-22",
    telefone: "(11) 98888-5678",
    ultimaConsulta: "2024-01-10",
    status: "Ativo",
  },
  {
    id: 3,
    nome: "Ana Paula Costa",
    dataNascimento: "1992-11-08",
    telefone: "(11) 97777-9012",
    ultimaConsulta: "2023-12-20",
    status: "Inativo",
  },
  {
    id: 4,
    nome: "Carlos Eduardo Lima",
    dataNascimento: "1965-05-30",
    telefone: "(11) 96666-3456",
    ultimaConsulta: "2024-01-18",
    status: "Ativo",
  },
  {
    id: 5,
    nome: "Fernanda Rodrigues",
    dataNascimento: "1988-09-12",
    telefone: "(11) 95555-7890",
    ultimaConsulta: "2024-01-12",
    status: "Ativo",
  },
  {
    id: 6,
    nome: "Roberto Almeida",
    dataNascimento: "1975-12-03",
    telefone: "(11) 94444-2345",
    ultimaConsulta: "2023-11-25",
    status: "Inativo",
  },
  {
    id: 7,
    nome: "Juliana Pereira",
    dataNascimento: "1990-04-18",
    telefone: "(11) 93333-6789",
    ultimaConsulta: "2024-01-20",
    status: "Ativo",
  },
  {
    id: 8,
    nome: "Pedro Henrique Souza",
    dataNascimento: "1982-08-25",
    telefone: "(11) 92222-0123",
    ultimaConsulta: "2024-01-08",
    status: "Ativo",
  },
];

export default function PacientesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtrar pacientes baseado no termo de busca
  const filteredPacientes = pacientesData.filter((paciente) =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular paginação
  const totalPages = Math.ceil(filteredPacientes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPacientes = filteredPacientes.slice(startIndex, endIndex);

  // Função para formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  // Função para calcular idade
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

  const handleEdit = (id: number) => {
    console.log("Editar paciente:", id);
    // Implementar lógica de edição
  };

  const handleDelete = (id: number) => {
    console.log("Excluir paciente:", id);
    // Implementar lógica de exclusão
  };

  const handleNewPatient = () => {
      redirect("/dashboard/pacientes/create")
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Pacientes
            </h1>
            <p className="text-gray-600">
              Gerencie os pacientes do seu consultório
            </p>
          </div>
          <div className="space-x-3">
            <Link href={"/dashboard"}>
              <Button variant="outline" className="w-full sm:w-auto">
                <ArrowBigLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <Button onClick={handleNewPatient} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Novo Paciente
            </Button>
          </div>
        </div>

        {/* Card principal */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Lista de Pacientes</CardTitle>

            {/* Campo de busca */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar paciente..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset para primeira página ao buscar
                }}
                className="pl-10"
              />
            </div>
          </CardHeader>

          <CardContent>
            {/* Tabela Desktop */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome do Paciente</TableHead>
                    <TableHead>Data de Nascimento</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Última Consulta</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPacientes.map((paciente) => (
                    <TableRow key={paciente.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">{paciente.nome}</div>
                            <div className="text-sm text-gray-500">
                              {calculateAge(paciente.dataNascimento)} anos
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {formatDate(paciente.dataNascimento)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {paciente.telefone}
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatDate(paciente.ultimaConsulta)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            paciente.status === "Ativo"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            paciente.status === "Ativo"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {paciente.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(paciente.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(paciente.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
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

            {/* Cards Mobile */}
            <div className="space-y-4 md:hidden">
              {currentPacientes.map((paciente) => (
                <Card key={paciente.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{paciente.nome}</div>
                          <div className="text-sm text-gray-500">
                            {calculateAge(paciente.dataNascimento)} anos
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          paciente.status === "Ativo" ? "default" : "secondary"
                        }
                        className={
                          paciente.status === "Ativo"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                      >
                        {paciente.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>
                          Nascimento: {formatDate(paciente.dataNascimento)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{paciente.telefone}</span>
                      </div>
                      <div className="text-gray-600">
                        Última consulta: {formatDate(paciente.ultimaConsulta)}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(paciente.id)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(paciente.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Mostrando {startIndex + 1} a{" "}
                  {Math.min(endIndex, filteredPacientes.length)} de{" "}
                  {filteredPacientes.length} pacientes
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
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
                        className="w-8"
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
                  >
                    Próximo
                  </Button>
                </div>
              </div>
            )}

            {/* Mensagem quando não há resultados */}
            {filteredPacientes.length === 0 && (
              <div className="py-8 text-center">
                <User className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Nenhum paciente encontrado
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm
                    ? "Tente ajustar sua busca"
                    : "Comece adicionando um novo paciente"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
