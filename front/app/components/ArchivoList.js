// front/app/components/ArchivoList.js
const ArchivoList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center bg-gray-800 p-4 rounded-lg">
        <span className="flex-1">Remito.pdf</span>
        <button className="p-2 bg-gray-700 text-white rounded-lg ml-4">Editar</button>
        <button className="p-2 bg-red-600 text-white rounded-lg ml-2">Eliminar</button>
      </div>
      <div className="flex items-center bg-gray-800 p-4 rounded-lg">
        <span className="flex-1">Examen Laboratorio - Materia prima.pdf</span>
        <button className="p-2 bg-gray-700 text-white rounded-lg ml-4">Editar</button>
        <button className="p-2 bg-red-600 text-white rounded-lg ml-2">Eliminar</button>
      </div>
      <div className="flex items-center bg-gray-800 p-4 rounded-lg">
        <span className="flex-1">Certificación Producto Libre de alérgenos.jpg</span>
        <button className="p-2 bg-gray-700 text-white rounded-lg ml-4">Editar</button>
        <button className="p-2 bg-red-600 text-white rounded-lg ml-2">Eliminar</button>
      </div>
      <div className="flex items-center bg-gray-800 p-4 rounded-lg">
        <span className="flex-1">Info Transporte.pdf</span>
        <button className="p-2 bg-gray-700 text-white rounded-lg ml-4">Editar</button>
        <button className="p-2 bg-red-600 text-white rounded-lg ml-2">Eliminar</button>
      </div>
      <div className="flex items-center bg-gray-800 p-4 rounded-lg">
        <span className="flex-1">RNPA.xlsx</span>
        <button className="p-2 bg-gray-700 text-white rounded-lg ml-4">Editar</button>
        <button className="p-2 bg-red-600 text-white rounded-lg ml-2">Eliminar</button>
      </div>
    </div>
  );
};

export default ArchivoList;
