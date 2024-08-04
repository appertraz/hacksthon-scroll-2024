// front/app/components/LoteListLoteListo.js
const LoteListLoteListo = () => {
    const estado = 'listo'; // Estado fijo para esta vista
  
    return (
      <div className="space-y-4">
        <div className="flex items-center bg-gray-800 p-4 rounded-lg">
          <span className="flex-1">"Nombre del lote"</span>
          <span className="text-gray-500">3/8/2024</span>
          <button className="ml-4 p-2 bg-gray-700 text-white rounded-lg">
            {estado === 'listo' ? 'Lote Listo' : 'Sin finalizar'}
          </button>
        </div>
      </div>
    );
  };
  
  export default LoteListLoteListo;
  