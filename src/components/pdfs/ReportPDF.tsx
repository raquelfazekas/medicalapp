/* eslint-disable jsx-a11y/alt-text */
"use client";

import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { styles } from "./style";
import { Paciente } from "@prisma/client";
import { calcularIdade, formatDate } from "@/lib/formatters";

interface PDF1Props {
  paciente: Paciente;
  dataEmissao: string;
  type: string;
  text: string;
}

const ReportPdfView = ({ paciente, dataEmissao, type, text }: PDF1Props) => (
  <Document author="Victor Fazekas">
    <Page size="A4" style={styles.page}>
      {/* Tipo do relatório no topo */}
      <Text style={[styles.title, { marginBottom: 10 }]}>{type}</Text>

      {/* Logo + informações do médico */}
      <View style={[styles.row, { marginBottom: 10 }]}>
        {/* Logo */}
        <Image src="/logo_pdf.png" style={styles.logo1} />

        {/* Quadro com as informações do médico */}
        <View style={[styles.box, { flex: 1, marginLeft: 10 }]}>
          <View style={styles.row}>
            <Text style={styles.label}>RJF - Medicina e Saúde Mental</Text>
            <Text>
              <Text style={styles.label}>Data de emissão:</Text>{" "}
              {formatDate(dataEmissao)}
            </Text>
          </View>
          <View style={[styles.row, { marginBottom: 15 }]}>
            <Text style={[styles.blueText, { marginTop: 6 }]}>
              Dr(a). Raquel de Jesus Fazekas
            </Text>
            <Text style={{ marginTop: 6 }}>CRM: 214876 - SP</Text>
          </View>
          <Text>
            <Text style={styles.label}>Endereço:</Text> Rua Dr. Souza Alves, 139
            - Centro, Taubaté - SP
          </Text>
        </View>
      </View>

      {/* Quadro com as informações do paciente */}
      <View style={[styles.box, { marginBottom: 10 }]}>
        <Text>
          <Text style={styles.label}>Paciente:</Text>{" "}
          {paciente.nomeCompleto || ""}
        </Text>
        <Text>
          <Text style={styles.label}>Idade:</Text>{" "}
          {calcularIdade(paciente.dataNascimento)} anos
        </Text>
        <Text>
          <Text style={styles.label}>Endereço:</Text> {paciente.endereco}
        </Text>
      </View>

      {/* Texto do relatório ou prontuário */}
      <View style={styles.box}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Page>
  </Document>
);

function stripHtml(html: string): string {
  if (typeof window !== "undefined") {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.innerText;
  }
  return html; // fallback para ambiente SSR
}

function ReportPdf({ paciente, dataEmissao, type, text }: PDF1Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full h-full">
      {isClient ? (
        <PDFViewer width="100%" height="600">
          <ReportPdfView
            paciente={paciente}
            dataEmissao={dataEmissao}
            type={type}
            text={stripHtml(text)}
          />
        </PDFViewer>
      ) : (
        <div>Loading PDF...</div>
      )}
    </div>
  );
}

export default ReportPdf;
