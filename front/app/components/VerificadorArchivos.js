// front/app/components/VerificadorArchivos.js
"use client"; // Añadir esta línea al principio del archivo

import { useState } from 'react';

const VerificadorArchivos = () => {
  const [transaccionURL, setTransaccionURL] = useState('');
  const [nftURL, setNftURL] = useState('');

  const handleTransaccionChange = (e) => {
    setTransaccionURL(e.target.value);
  };

  const handleNftChange = (e) => {
    setNftURL(e.target.value);
  };

  const handleSubmit = () => {
    // Aquí puedes manejar la lógica para subir y verificar el archivo
    console.log('Archivo subido y verificado');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="p-4">
        <div className="flex justify-between items-center mt-10 mb-12">
          <h1 className="text-center text-3xl font-bold">Verificador de archivos</h1>
          <div className="space-x-2">
            <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700">Volver</button>
            <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700">Salir</button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Ver transacción en la Blockchain</label>
          <input
            type="text"
            value={transaccionURL}
            onChange={handleTransaccionChange}
            className="p-2 w-full bg-gray-800 border border-gray-700 rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Ver NFT del lote en el Marketplace</label>
          <input
            type="text"
            value={nftURL}
            onChange={handleNftChange}
            className="p-2 w-full bg-gray-800 border border-gray-700 rounded-lg focus:outline-none"
          />
        </div>
        <div className="flex justify-center mb-4">
          <button
            className="p-2 bg-green-600 rounded-lg hover:bg-green-700"
            onClick={handleSubmit}
          >
            Subir archivo a comprobar
          </button>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p>1) Presione "Subir archivo a comprobar", se abrirá el selector de archivos</p>
          <p>2) Seleccione el archivo desde su computadora y presione abrir</p>
          <p>3) El verificador se conectará a PolygonScan y comprobará si el archivo es original</p>
          <p>4) Aquí aparecerá el resultado de la verificación del archivo subido</p>
        </div>
      </main>
    </div>
  );
};

export default VerificadorArchivos;
