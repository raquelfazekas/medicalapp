"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Tiptap from "@/components/rich-text-editor";
import { createDocumento, updateDocumento } from "@/actions/prescricaoActions";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Documento } from "@/types/documentTypes";

interface NewReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  initialData?: Documento | null;
}

export function NewReportModal({
  open,
  onOpenChange,
  mode,
  initialData,
}: NewReportModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [reportType, setReportType] = useState("");
  const [reportDate, setReportDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const params = useParams();
  const pacienteId = params?.id;
  const typeDoc = "RL";

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setReportType(initialData.type);
      setReportDate(initialData.dataConsulta.toISOString().split("T")[0]);
      setTitle(initialData.title);
      setContent(initialData.conteudo || "");
    } else {
      // Reset para criação
      setReportType("");
      setReportDate(new Date().toISOString().split("T")[0]);
      setTitle("");
      setContent("");
    }
  }, [mode, initialData, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "create") {
        await createDocumento(
          title,
          content,
          reportType,
          typeDoc,
          reportDate,
          pacienteId as string
        );
        toast.success("Relatório criado com sucesso!");
      } else if (mode === "edit" && initialData) {
        await updateDocumento(
          initialData.id,
          title,
          content,
          reportType,
          typeDoc,
          reportDate
        );
        toast.success("Relatório atualizado com sucesso!");
      }

      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar relatório. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Relatório Médico</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Tipo de Relatório</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Relatório Médico">
                    Relatório Médico
                  </SelectItem>
                  <SelectItem value="Relatório Psicológico">
                    Relatório Psicológico
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-date">Data do Relatório</Label>
              <Input
                id="report-date"
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Título do Relatório</Label>
            <Input
              id="title"
              placeholder="Ex: Avaliação Médica Completa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Tiptap content={content} onUpdate={setContent} />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Salvando..."
                : mode === "create"
                ? "Salvar Prontuário"
                : "Atualizar Prontuário"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
