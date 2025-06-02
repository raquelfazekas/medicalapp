import GenralStyle from "@/components/pdfs/GenralStyle";
import ReceitaEspecial from "@/components/pdfs/ReceitaEspecial";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Paciente, Receita } from "@prisma/client";

interface PDFModalProps {
  open: boolean;
  onClose: () => void;
  receita: Receita | null;
  paciente: Paciente;
}

export function PDFModal({ open, onClose, receita, paciente }: PDFModalProps) {
  if (!receita) return null;

  const isReceitaEspecial = receita.type === "Receita Especial";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogTitle className="sr-only">Visualização de Documento</DialogTitle>

        {isReceitaEspecial ? (
          <ReceitaEspecial
            paciente={paciente}
            endereco="Rua Dr. Souza Alves, 139 - Centro, Taubaté - SP"
            dataEmissao={receita.createdAt.toISOString()}
            text={receita.prescricao ?? ""}
            type={receita.type}
          />
        ) : (
          <GenralStyle
            paciente={paciente}
            endereco="Rua Dr. Souza Alves, 139 - Centro, Taubaté - SP"
            dataEmissao={receita.createdAt.toISOString()}
            text={receita.prescricao ?? ""}
            type={receita.type}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
