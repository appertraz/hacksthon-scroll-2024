// front/app/page.js
import Head from 'next/head';
import ClienteList from './components/ClienteList';



export default function Home() {
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
        <ClienteList />
      </main>
    </div>
  );
}
