"use client";

import { useEffect } from "react";

import Head from "next/head";
import ClienteList from "./components/ClienteList";
import { DB, listClients } from "./backend";

export default function Home() {
  useEffect(() => {
    DB.set("clients", [
      {
        id: "0",
        name: "Cliente 1",
        minter: "0x378E58E2033dD69927398b1979dD39eFc3123a43",
        lots: [
          {
            id: "10",
            name: "Lote 1",
            status: "loading", // loading | minting | finished
            description: "description",
            nft: "0x378E58E2033dD69927398b1979dD39eFc3123a43",
            files: [
              {
                name: "c1 l1 f1",
                hash: "hash",
              },
              {
                name: "c1 l1 f2",
                hash: "hash",
              },
            ],
          },
        ],
      },
      {
        id: "1",
        name: "Cliente 2",
        minter: "0x378E58E2033dD69927398b1979dD39eFc3123a43",
        lots: [
          {
            id: "11",
            name: "Lote 2",
            status: "loading", // loading | minting | finished
            description: "description",
            nft: "0x378E58E2033dD69927398b1979dD39eFc3123a43",
            files: [
              {
                name: "c2 l2 f3",
                hash: "hash",
              },
              {
                name: "c2 l2 f4",
                hash: "hash",
              },
            ],
          },
        ],
      },
    ]);
  }, []);

  const list = listClients();
  return (
    <div className="min-h-screen bg-gray-900 text-white margin">
      <Head>
        <title>Lista de clientes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <h1 className="text-center text-3xl font-bold mt-20">Lista de clientes</h1>
        <div className="flex justify-center mt-20 mb-20">
          <input
            type="text"
            placeholder="Nombre del cliente "
            className="p-2 w-2/3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none "
          />
          <button className="p-2 bg-green-600 rounded-r-lg hover:bg-green-700 ">Agregar cliente</button>
        </div>
        <ClienteList list={list} />
      </main>
    </div>
  );
}
