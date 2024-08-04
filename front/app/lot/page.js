"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
// import { useState } from "react";

import ArchivoList from "../components/ArchivoList";
import { DB, getClient, listFiles, addFile } from "../backend";

async function sha2_256(buffer, encoding) {
  if (!crypto || !crypto.subtle || typeof crypto.subtle.digest !== "function") {
    throw new Error("Web Cryptography API no está soportada en este navegador");
  }
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Buffer.from(digest).toString(encoding);
}

function getPromiseFiles({ callback }) {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("multiple", true);
  input.onchange = () => {
    const promises = [];
    for (const file of input.files) {
      promises.push(
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = async () => {
            const data = {
              file,
              sha2_256_b64: await sha2_256(reader.result, "base64"),
            };
            resolve(data);
          };
          reader.readAsArrayBuffer(file);
        })
      );
    }
    callback(promises);
  };
  input.click();
}

export default function Lot() {
  //const [changed, setChanged] = useState(false);
  const router = useRouter();
  const cid = DB.get("cid");
  const lid = DB.get("lid");
  const name = getClient(cid).name;
  const files = listFiles(cid, lid);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Lotes de {name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-center text-3xl font-bold mt-10 mb-12">Lotes de {name}</h1>
          <div className="space-x-2">
            <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700">Volver</button>
            <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700">Salir</button>
          </div>
        </div>
        <div className="flex justify-center mb-4 space-x-4">
          <button
            className="p-2 bg-green-600 rounded-lg hover:bg-green-700"
            onClick={() =>
              getPromiseFiles({
                callback: async (promises) => {
                  for (const promise of promises) {
                    const data = await promise;
                    addFile(cid, lid, {
                      name: data.file.name,
                      hash: data.sha2_256_b64,
                    });
                  }
                  //setChanged(true);
                },
              })
            }>
            Agregar archivo
          </button>
          <button className="p-2 bg-green-600 border border-blue-500 rounded-lg hover:bg-green-700">
            Finalizar lote
          </button>
        </div>
        <ArchivoList list={files} />
      </main>
    </div>
  );
}
