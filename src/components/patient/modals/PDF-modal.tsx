import GenralStyle from "@/components/pdfs/GenralStyle";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { formatDate } from "@/lib/formatters";
import { Paciente, Receita } from "@prisma/client";

interface PDFModalProps {
  open: boolean;
  onClose: () => void;
  receita: Receita | null;
  paciente: Paciente;
}

export function PDFModal({ open, onClose, receita, paciente }: PDFModalProps) {
  if (!receita) return null;

  console.log(receita.createdAt);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogTitle className="sr-only">Visualização de Documento</DialogTitle>

        {/* Aqui você pode condicionar qual modelo usar */}
        <GenralStyle
          paciente={paciente}
          endereco="Rua Dr. Souza Alves, 139 - Centro, Taubaté - SP"
          dataEmissao={formatDate(receita.createdAt)}
          text={receita.prescricao ?? ""}
          type={receita.type}
        />
      </DialogContent>
    </Dialog>
  );
}
