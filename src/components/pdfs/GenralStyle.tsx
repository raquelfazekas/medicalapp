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
import { calcularIdade } from "@/lib/formatters";
import { Paciente } from "@prisma/client";

const MyDocument = ({ paciente, text, type }: PDF1Props) => (
  <Document author="Victor Fazekas">
    <Page size="A4" style={styles.page}>
      {/* Logo */}
      <Image src="/logo_pdf.png" style={styles.logo} />

      <Text style={[styles.title, styles.box]}>{type}</Text>

      {/* Identificação do Emitente */}
      <View style={styles.box}>
        <Text style={[styles.label, { marginBottom: 6 }]}>
          RJF - Medicina e Saúde Mental
        </Text>
        <View style={[styles.row, { marginTop: 6 }]}>
          <Text style={{ marginBottom: 6 }}>
            <Text style={styles.label}>Endereço:</Text> Rua Dr. Souza Alves, 139
            - Centro, Taubaté - SP
          </Text>
          <Text style={{ marginBottom: 6 }}>
            <Text style={styles.label}>Data de emissão:</Text> 31/05/2025
          </Text>
        </View>
        <View style={[styles.row, { marginTop: 6 }]}>
          <Text style={[styles.blueText, { marginBottom: 6 }]}>
            Dr(a). Raquel de Jesus Fazekas
          </Text>
          <Text style={[styles.label, { marginBottom: 6 }]}>
            CRM: 214876 - SP
          </Text>
        </View>
      </View>

      {/* Paciente */}
      <View style={[styles.row, { margin: 10 }]}>
        <Text>
          <Text style={styles.label}>Paciente:</Text> {paciente.nomeCompleto}
        </Text>
        <Text>
          <Text style={styles.label}>Idade:</Text> {calcularIdade(paciente.dataNascimento)}
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Page>
  </Document>
);

interface PDF1Props {
  paciente: Paciente
  endereco: string;
  dataEmissao: string;
  text: string;
  type: string;
}

function PDF1({
  paciente,
  endereco,
  dataEmissao,
  text,
  type,
}: PDF1Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full h-full">
      {isClient ? (
        <PDFViewer width="100%" height="600">
          <MyDocument
            text={text}
            paciente={paciente}
            endereco={endereco}
            dataEmissao={dataEmissao}
            type={type}
          />
        </PDFViewer>
      ) : (
        <div>Loading PDF...</div>
      )}
    </div>
  );
}

export default PDF1;
