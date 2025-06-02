import ReportPdf from "@/components/pdfs/ReportPDF";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Paciente } from "@prisma/client";
import { Documento } from "@/types/documentTypes";

interface PDFModalProps {
  open: boolean;
  onClose: () => void;
  documentos: Documento | null;
  paciente: Paciente;
}

export function PDFModalRLPR({
  open,
  onClose,
  documentos,
  paciente,
}: PDFModalProps) {
  if (!documentos) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogTitle className="sr-only">Visualização de Documento</DialogTitle>
        <ReportPdf
          paciente={paciente}
          dataEmissao={documentos.createdAt.toISOString()}
          text={documentos.conteudo ?? ""}
          type={documentos.type ?? ""}
        />
      </DialogContent>
    </Dialog>
  );
}
