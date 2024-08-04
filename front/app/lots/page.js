"use client";

import Head from "next/head";

import LoteList from "../components/LoteList";
import { DB, getClient, listLots } from "../backend";

export default function Lots() {
  const cid = DB.get("cid");
  const name = getClient(cid).name;
  const lots = listLots(cid);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Lotes de {name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-center justify-normal text-3xl font-bold mt-10 mb-12">Lotes de {name}</h1>
          <div className="space-x-2">
            <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700">Volver</button>
            <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700">Salir</button>
          </div>
        </div>
        <div className="flex justify-center mt-10 mb-10">
          <input
            type="text"
            placeholder="Nombre del lote"
            className="p-2 w-2/3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none"
          />
          <button className="p-2 bg-green-600 rounded-r-lg hover:bg-green-700">Agregar lote</button>
        </div>
        <LoteList list={lots} />
      </main>
    </div>
  );
}
