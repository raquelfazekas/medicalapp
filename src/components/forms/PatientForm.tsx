/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  createPaciente,
  updatePaciente,
  GetPaciente,
} from "@/actions/pacienteActions";
import { formatCPF, formatPhone } from "@/lib/formatters";
import { patientSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";

type PatientFormData = z.infer<typeof patientSchema>;

interface PatientFormProps {
  patientId?: string;
}

export default function PatientForm({ patientId }: PatientFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!!patientId);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      nomeCompleto: "",
      nomeSocial: "",
      dataNascimento: "",
      cpf: "",
      genero: "",
      estadoCivil: "",
      numeroFilhos: 0,
      profissao: "",
      escolaridade: "",
      naturalidade: "",
      religiao: "",
      email: "",
      telefone: "",
      endereco: "",
    },
  });

  const cpfValue = watch("cpf");
  const telefoneValue = watch("telefone");

  useEffect(() => {
    const fetchPatient = async () => {
      if (!patientId) return;
      try {
        setIsLoading(true);
        const patient = await GetPaciente(patientId);
        if (!patient) throw new Error("Paciente não encontrado");
        reset({
          nomeCompleto: patient.nomeCompleto,
          nomeSocial: patient.nomeSocial || "",
          dataNascimento: patient.dataNascimento.toISOString().split("T")[0],
          cpf: patient.cpf,
          genero: patient.genero,
          estadoCivil: patient.estadoCivil,
          numeroFilhos: patient.numeroFilhos,
          profissao: patient.profissao,
          escolaridade: patient.escolaridade,
          naturalidade: patient.naturalidade,
          religiao: patient.religiao,
          email: patient.email || "",
          telefone: patient.telefone || "",
          endereco: patient.endereco,
        });
      } catch (error: any) {
        console.error("Erro ao carregar paciente:", error);
        toast.error(error.message || "Erro ao carregar dados do paciente", {
          duration: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatient();
  }, [patientId, reset]);

  const onSubmit = async (data: PatientFormData) => {
    try {
      setIsSubmitting(true);
      if (patientId) {
        await updatePaciente(patientId, data);
        toast.success("Paciente atualizado com sucesso!", {
          duration: 3000,
        });
      } else {
        await createPaciente(data);
        toast.success("Paciente cadastrado com sucesso!", {
          duration: 3000,
        });
      }
      router.push("/dashboard/pacientes");
    } catch (error: any) {
      console.error("Erro ao salvar paciente:", error);
      toast.error(
        error.message ||
          `Erro ao ${patientId ? "atualizar" : "cadastrar"} paciente.`,
        {
          duration: 5000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">
            {patientId ? "Editar Paciente" : "Cadastrar Paciente"}
          </CardTitle>
          <CardDescription className="text-center text-blue-100">
            {patientId
              ? "Atualize os dados do paciente abaixo"
              : "Preencha os dados abaixo para cadastrar um novo paciente"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="nomeCompleto"
                    className="text-sm font-medium text-gray-700"
                  >
                    Nome Completo <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nomeCompleto"
                    {...register("nomeCompleto")}
                    placeholder="Digite o nome completo"
                    className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    aria-invalid={!!errors.nomeCompleto}
                  />
                  {errors.nomeCompleto && (
                    <p className="text-sm text-red-500">
                      {errors.nomeCompleto.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="nomeSocial"
                    className="text-sm font-medium text-gray-700"
                  >
                    Nome Social
                  </Label>
                  <Input
                    id="nomeSocial"
                    {...register("nomeSocial")}
                    placeholder="Digite o nome social (opcional)"
                    className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    aria-invalid={!!errors.nomeSocial}
                  />
                  {errors.nomeSocial && (
                    <p className="text-sm text-red-500">
                      {errors.nomeSocial.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="dataNascimento"
                    className="text-sm font-medium text-gray-700"
                  >
                    Data de Nascimento <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dataNascimento"
                    type="date"
                    {...register("dataNascimento")}
                    className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    aria-invalid={!!errors.dataNascimento}
                  />
                  {errors.dataNascimento && (
                    <p className="text-sm text-red-500">
                      {errors.dataNascimento.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="cpf"
                    className="text-sm font-medium text-gray-700"
                  >
                    CPF <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cpf"
                    {...register("cpf")}
                    value={cpfValue ? formatCPF(cpfValue) : ""}
                    onChange={(e) => setValue("cpf", e.target.value)}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    aria-invalid={!!errors.cpf}
                  />
                  {errors.cpf && (
                    <p className="text-sm text-red-500">{errors.cpf.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="genero"
                    className="text-sm font-medium text-gray-700"
                  >
                    Gênero <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => setValue("genero", value)}
                    defaultValue={watch("genero") || ""}
                  >
                    <SelectTrigger className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                      <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.genero && (
                    <p className="text-sm text-red-500">
                      {errors.genero.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="estadoCivil"
                    className="text-sm font-medium text-gray-700"
                  >
                    Estado Civil <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => setValue("estadoCivil", value)}
                    defaultValue={watch("estadoCivil") || ""}
                  >
                    <SelectTrigger className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                      <SelectValue placeholder="Selecione o estado civil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                      <SelectItem value="casado">Casado(a)</SelectItem>
                      <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                      <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.estadoCivil && (
                    <p className="text-sm text-red-500">
                      {errors.estadoCivil.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="numeroFilhos"
                    className="text-sm font-medium text-gray-700"
                  >
                    Número de Filhos <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="numeroFilhos"
                    type="number"
                    min="0"
                    {...register("numeroFilhos", { valueAsNumber: true })}
                    placeholder="0"
                    className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    aria-invalid={!!errors.numeroFilhos}
                  />
                  {errors.numeroFilhos && (
                    <p className="text-sm text-red-500">
                      {errors.numeroFilhos.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="profissao"
                    className="text-sm font-medium text-gray-700"
                  >
                    Profissão <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="profissao"
                    {...register("profissao")}
                    placeholder="Digite a profissão"
                    className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    aria-invalid={!!errors.profissao}
                  />
                  {errors.profissao && (
                    <p className="text-sm text-red-500">
                      {errors.profissao.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="escolaridade"
                    className="text-sm font-medium text-gray-700"
                  >
                    Escolaridade <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => setValue("escolaridade", value)}
                    defaultValue={watch("escolaridade") || ""}
                  >
                    <SelectTrigger className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                      <SelectValue placeholder="Selecione a escolaridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fundamental">Fundamental</SelectItem>
                      <SelectItem value="medio">Médio</SelectItem>
                      <SelectItem value="superior">Superior</SelectItem>
                      <SelectItem value="pos-graduacao">
                        Pós-graduação
                      </SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.escolaridade && (
                    <p className="text-sm text-red-500">
                      {errors.escolaridade.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="naturalidade"
                    className="text-sm font-medium text-gray-700"
                  >
                    Naturalidade <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="naturalidade"
                    {...register("naturalidade")}
                    placeholder="Digite a naturalidade"
                    className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    aria-invalid={!!errors.naturalidade}
                  />
                  {errors.naturalidade && (
                    <p className="text-sm text-red-500">
                      {errors.naturalidade.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="religiao"
                    className="text-sm font-medium text-gray-700"
                  >
                    Religião <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="religiao"
                    {...register("religiao")}
                    placeholder="Digite a religião"
                    className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    aria-invalid={!!errors.religiao}
                  />
                  {errors.religiao && (
                    <p className="text-sm text-red-500">
                      {errors.religiao.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="exemplo@email.com (opcional)"
                    className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="telefone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Telefone
                  </Label>
                  <Input
                    id="telefone"
                    {...register("telefone")}
                    value={telefoneValue ? formatPhone(telefoneValue) : ""}
                    onChange={(e) => setValue("telefone", e.target.value)}
                    placeholder="(XX) XXXXX-XXXX (opcional)"
                    maxLength={15}
                    className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    aria-invalid={!!errors.telefone}
                  />
                  {errors.telefone && (
                    <p className="text-sm text-red-500">
                      {errors.telefone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="endereco"
                  className="text-sm font-medium text-gray-700"
                >
                  Endereço <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="endereco"
                  {...register("endereco")}
                  placeholder="Digite o endereço completo"
                  className="w-full min-h-[100px] rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  aria-invalid={!!errors.endereco}
                />
                {errors.endereco && (
                  <p className="text-sm text-red-500">
                    {errors.endereco.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end pt-6 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard/pacientes")}
                  className="w-full md:w-auto min-w-[200px] border-gray-300 hover:bg-gray-100"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto min-w-[200px] bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {patientId ? "Atualizando..." : "Cadastrando..."}
                    </div>
                  ) : patientId ? (
                    "Atualizar Paciente"
                  ) : (
                    "Cadastrar Paciente"
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
