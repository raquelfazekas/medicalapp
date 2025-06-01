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
import { Textarea } from "@/components/ui/textarea";
import PDF1 from "@/components/pdfs/GenralStyle";
import PDF2 from "@/components/pdfs/ReceitaEspecial";
import { Paciente } from "@prisma/client";

interface NewDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentType: string;
  pacitente: Paciente;
}

export function NewDocumentModal({
  open,
  onOpenChange,
  documentType,
  pacitente,
}: NewDocumentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [observations, setObservations] = useState("");
  const [dataEmissao, setDataEmissao] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  const getDocumentTitle = () => {
    switch (documentType) {
      case "receita-simples":
        return "Gerar Receita Simples";
      case "receita-especial":
        return "Gerar Receita Especial";
      case "atestado":
        return "Gerar Atestado Médico";
      case "solicitacao-exame":
        return "Gerar Solicitação de Exame";
      default:
        return "Gerar Documento";
    }
  };
  const getPdfTitle = () => {
    switch (documentType) {
      case "receita-simples":
        return "Receita Simples";
      case "receita-especial":
        return "Receita Especial";
      case "atestado":
        return "Atestado Médico";
      case "solicitacao-exame":
        return "Solicitação de Exame";
      default:
        return "Gerar Documento";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setIsLoading(false);
    onOpenChange(false);
  };

  const renderFormFields = () => {
    const pdfProps = {
      text: observations,
      pacitente,
      endereco: pacitente.endereco,
      dataEmissao: dataEmissao,
    };

    switch (documentType) {
      case "receita-especial":
        return (
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="observations">Observações</Label>
              <Textarea
                id="observations"
                placeholder="Observações adicionais..."
                rows={2}
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
              />
            </div>

            <PDF2 paciente={pacitente} {...pdfProps} />
          </div>
        );

      case "atestado":
      case "receita-simples":
      case "solicitacao-exame":
        return (
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="observations">Observações</Label>
              <Textarea
                id="observations"
                placeholder="Observações adicionais..."
                rows={2}
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
              />
            </div>

            <PDF1 paciente={pacitente} type={getPdfTitle()} {...pdfProps} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getDocumentTitle()}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="document-date">Data do Documento</Label>
            <Input
              id="document-date"
              type="date"
              value={dataEmissao}
              onChange={(e) => setDataEmissao(e.target.value)}
            />
          </div>

          {renderFormFields()}

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Gerando PDF..." : "Gerar Documento"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
