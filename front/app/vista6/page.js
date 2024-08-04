// front/app/ver-nft/page.js
import Head from 'next/head';
import LoteListVerNFT from '../components/LoteListVerNFT';

export default function VerNFT() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Lotes de Cliente 1</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-center text-3xl font-bold mt-10 mb-12">Lotes de Cliente 1</h1>
          <div className="space-x-2">
            <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700">Volver</button>
            <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700">Salir</button>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <button className="p-2 bg-green-600 rounded-lg hover:bg-green-700">Ver NFT</button>
        </div>
        <LoteListVerNFT />
      </main>
    </div>
  );
}
