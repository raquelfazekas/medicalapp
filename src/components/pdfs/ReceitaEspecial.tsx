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
import { formatDateString } from "@/lib/formatters";

const MyDocument = ({ paciente, dataEmissao, text }: PDF1Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Logo */}
      <Image src="/logo_pdf.png" style={styles.logo} />

      <Text style={[styles.title, styles.box]}>
        RECEITUÁRIO DE CONTROLE ESPECIAL
      </Text>

      {/* Identificação do Emitente */}
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={[styles.label, { marginBottom: 6 }]}>
            IDENTIFICAÇÃO DO EMITENTE
          </Text>
          <Text style={{ marginBottom: 6 }}>
            <Text style={styles.label}>Data de Emissão: </Text>{" "}
            {formatDateString(dataEmissao)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.blueText, { marginBottom: 6 }]}>
            Dr(a). Raquel de Jesus Fazekas
          </Text>
          <Text>1ª VIA FARMÁCIA</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ marginBottom: 6 }}>
            <Text style={styles.label}>CRM:</Text> 214876 - SP
          </Text>
          <Text>2ª VIA PACIENTE</Text>
        </View>
        <Text style={{ marginBottom: 6 }}>
          <Text style={styles.label}>Endereço: </Text> Rua Dr. Souza Alves, 139
          - Centro, Taubaté - SP
        </Text>
        <View style={styles.row}>
          <Text style={{ marginBottom: 6 }}>
            <Text style={styles.label}>Cidade: </Text> Taubaté
          </Text>
          <Text style={{ marginBottom: 6 }}>
            <Text style={styles.label}>UF: </Text> SP
          </Text>
        </View>
      </View>

      {/* Paciente */}
      <View style={[styles.row, { margin: 10 }]}>
        <Text style={{ fontSize: 11 }}>
          <Text style={styles.label}>Paciente:</Text> {paciente.nomeCompleto}
        </Text>
        <Text style={{ fontSize: 11 }}>
          <Text style={styles.label}>Endereço:</Text> {paciente.endereco}
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* Quadro - Identificação do Comprador */}
        <View style={[styles.boxQuadro]}>
          <Text style={[styles.labelQuadro]}>IDENTIFICAÇÃO DO COMPRADOR</Text>
          <Text style={styles.text}>
            Nome: __________________________________
          </Text>
          <Text style={styles.text}>
            Ident: __________________ Org. Emissor: _____
          </Text>
          <Text style={styles.textQuadro}>
            End:________________________________________
          </Text>
          <Text style={styles.text}>
            Cidade: _______________________ UF: ______
          </Text>
          <Text style={styles.text}>
            tel: _____________________________________
          </Text>
        </View>

        {/* Quadro - Identificação do Fornecedor */}
        <View style={[styles.boxQuadro]}>
          <Text style={[styles.labelQuadro]}>IDENTIFICAÇÃO DO FORNECEDOR</Text>
          <Text style={styles.text}>DATA: ____/____/______</Text>
          <Text style={{ marginTop: 30 }}>
            _____________________________________
          </Text>
          <Text style={[styles.text, { textAlign: "center" }]}>
            ASSINATURA DO FARMACÊUTICO
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

interface PDF1Props {
  paciente: Paciente;
  endereco: string;
  dataEmissao: string;
  text: string;
}

function ReceitaEspecial({ paciente, endereco, dataEmissao, text }: PDF1Props) {
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
          />
        </PDFViewer>
      ) : (
        <div>Loading PDF...</div>
      )}
    </div>
  );
}

export default ReceitaEspecial;
