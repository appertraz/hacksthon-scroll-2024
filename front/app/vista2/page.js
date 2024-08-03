
import Head from 'next/head';
import LoteList from '../components/LoteList';

export default function Lotes() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Lotes de Cliente 1</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-center text-3xl font-bold">Lotes de Cliente 1</h1>
          <div className="space-x-2">
            <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700">Volver</button>
            <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700">Salir</button>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Nombre del lote"
            className="p-2 w-2/3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none"
          />
          <button className="p-2 bg-green-600 rounded-r-lg hover:bg-green-700">Agregar lote</button>
        </div>
        <LoteList />
      </main>
    </div>
  );
}
