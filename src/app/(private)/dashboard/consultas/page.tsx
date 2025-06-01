"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import PDF2 from "@/components/pdfs/ReceitaEspecial";

function PageConsulta() {
  const [nome, setNome] = useState("");

  const paciente = "Paciente teste";
  const endereco = "Rua teste dos testes";

  return (
    <div className="flex gap-4">
      <div className="w-1/2 p-4 border">
        <h2 className="text-lg font-bold mb-2">Form</h2>
        <Textarea
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="w-1/2 p-4 border">
        <PDF2
          text={nome}
          paciente={paciente}
          endereco={endereco}
          sexo={"Masculino"}
          dataEmissao="31/05/2025"
        />
      </div>
    </div>
  );
}

export default PageConsulta;
