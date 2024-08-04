"use client";

// front/app/verificador-archivos/page.js

import Head from "next/head";
import VerificadorArchivos from "../components/VerificadorArchivos";

export default function VerificadorArchivosPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white ">
      <Head>
        <title>Verificador de archivos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VerificadorArchivos />
    </div>
  );
}
