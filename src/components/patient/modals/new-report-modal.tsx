"use client";

import type React from "react";

import { useState } from "react";
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
import { createDocumento } from "@/actions/prescricaoActions";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface NewReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewReportModal({ open, onOpenChange }: NewReportModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [reportType, setReportType] = useState("");
  const [reportDate, setReportDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const params = useParams();
  const pacienteId = params?.id;
  const typeDoc = "RL"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createDocumento(
        title,
        content,
        reportType,
        typeDoc,
        reportDate,
        pacienteId as string
        
      );

      toast.success("Relatório criado com sucesso!");
      
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar relatório. Tente novamente.");
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
                  <SelectItem value="cardiologico">
                    Relatório Cardiológico
                  </SelectItem>
                  <SelectItem value="laboratorial">
                    Relatório Laboratorial
                  </SelectItem>
                  <SelectItem value="radiologico">
                    Relatório Radiológico
                  </SelectItem>
                  <SelectItem value="cirurgico">Relatório Cirúrgico</SelectItem>
                  <SelectItem value="psicologico">
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
              placeholder="Ex: Avaliação Cardiológica Completa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Tiptap onUpdate={setContent} />
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
              {isLoading ? "Salvando..." : "Salvar Relatório"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
