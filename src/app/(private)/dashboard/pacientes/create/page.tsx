/* eslint-disable @typescript-eslint/no-explicit-any */
 

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
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
import { createPaciente } from "@/lib/pacienteApi";
import { formatCPF, formatPhone } from "@/components/formatInput/formatters";
import { patientSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";

type PatientFormData = z.infer<typeof patientSchema>;

export default function PatientForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });

  const cpfValue = watch("cpf");
  const telefoneValue = watch("telefone");

  // ENVIA O FORM
  const onSubmit = async (data: PatientFormData) => {
    try {
      setIsSubmitting(true);
      await createPaciente(data);
      toast.success("Paciente cadastrado com sucesso!");
      router.push("/dashboard/pacientes");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Erro ao cadastrar paciente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Cadastrar Paciente
            </CardTitle>
            <CardDescription className="text-center">
              Preencha os dados do paciente para realizar o cadastro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nome Completo */}
                <div className="space-y-2">
                  <Label htmlFor="nomeCompleto">Nome Completo *</Label>
                  <Input
                    id="nomeCompleto"
                    {...register("nomeCompleto")}
                    placeholder="Digite o nome completo"
                  />
                  {errors.nomeCompleto && (
                    <p className="text-sm text-red-500">
                      {errors.nomeCompleto.message}
                    </p>
                  )}
                </div>

                {/* Nome Social */}
                <div className="space-y-2">
                  <Label htmlFor="nomeSocial">Nome Social</Label>
                  <Input
                    id="nomeSocial"
                    {...register("nomeSocial")}
                    placeholder="Digite o nome social (opcional)"
                  />
                  {errors.nomeSocial && (
                    <p className="text-sm text-red-500">
                      {errors.nomeSocial.message}
                    </p>
                  )}
                </div>

                {/* Data de Nascimento */}
                <div className="space-y-2">
                  <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                  <Input
                    id="dataNascimento"
                    type="date"
                    {...register("dataNascimento")}
                  />
                  {errors.dataNascimento && (
                    <p className="text-sm text-red-500">
                      {errors.dataNascimento.message}
                    </p>
                  )}
                </div>

                {/* CPF */}
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    {...register("cpf")}
                    value={cpfValue ? formatCPF(cpfValue) : ""}
                    onChange={(e) => setValue("cpf", e.target.value)}
                    placeholder="000.000.000-00"
                    maxLength={14}
                  />
                  {errors.cpf && (
                    <p className="text-sm text-red-500">{errors.cpf.message}</p>
                  )}
                </div>

                {/* Gênero */}
                <div className="space-y-2">
                  <Label htmlFor="genero">Gênero *</Label>
                  <Select onValueChange={(value) => setValue("genero", value)}>
                    <SelectTrigger>
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

                {/* Estado Civil */}
                <div className="space-y-2">
                  <Label htmlFor="estadoCivil">Estado Civil *</Label>
                  <Select
                    onValueChange={(value) => setValue("estadoCivil", value)}
                  >
                    <SelectTrigger>
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

                {/* Número de Filhos */}
                <div className="space-y-2">
                  <Label htmlFor="numeroFilhos">Número de Filhos *</Label>
                  <Input
                    id="numeroFilhos"
                    type="number"
                    min="0"
                    {...register("numeroFilhos", { valueAsNumber: true })}
                    placeholder="0"
                  />
                  {errors.numeroFilhos && (
                    <p className="text-sm text-red-500">
                      {errors.numeroFilhos.message}
                    </p>
                  )}
                </div>

                {/* Profissão */}
                <div className="space-y-2">
                  <Label htmlFor="profissao">Profissão *</Label>
                  <Input
                    id="profissao"
                    {...register("profissao")}
                    placeholder="Digite a profissão"
                  />
                  {errors.profissao && (
                    <p className="text-sm text-red-500">
                      {errors.profissao.message}
                    </p>
                  )}
                </div>

                {/* Escolaridade */}
                <div className="space-y-2">
                  <Label htmlFor="escolaridade">Escolaridade *</Label>
                  <Select
                    onValueChange={(value) => setValue("escolaridade", value)}
                  >
                    <SelectTrigger>
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

                {/* Naturalidade */}
                <div className="space-y-2">
                  <Label htmlFor="naturalidade">Naturalidade *</Label>
                  <Input
                    id="naturalidade"
                    {...register("naturalidade")}
                    placeholder="Digite a naturalidade"
                  />
                  {errors.naturalidade && (
                    <p className="text-sm text-red-500">
                      {errors.naturalidade.message}
                    </p>
                  )}
                </div>

                {/* Religião */}
                <div className="space-y-2">
                  <Label htmlFor="religiao">Religião *</Label>
                  <Input
                    id="religiao"
                    {...register("religiao")}
                    placeholder="Digite a religião"
                  />
                  {errors.religiao && (
                    <p className="text-sm text-red-500">
                      {errors.religiao.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="exemplo@email.com (opcional)"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Telefone */}
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    {...register("telefone")}
                    value={telefoneValue ? formatPhone(telefoneValue) : ""}
                    onChange={(e) => setValue("telefone", e.target.value)}
                    placeholder="(XX) XXXXX-XXXX (opcional)"
                    maxLength={15}
                  />
                  {errors.telefone && (
                    <p className="text-sm text-red-500">
                      {errors.telefone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Endereço */}
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço *</Label>
                <Textarea
                  id="endereco"
                  {...register("endereco")}
                  placeholder="Digite o endereço completo"
                  className="min-h-[100px]"
                />
                {errors.endereco && (
                  <p className="text-sm text-red-500">
                    {errors.endereco.message}
                  </p>
                )}
              </div>

              {/* Botão de Submit */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto min-w-[200px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cadastrando...
                    </>
                  ) : (
                    "Cadastrar Paciente"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
