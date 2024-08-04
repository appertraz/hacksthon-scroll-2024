// front/app/components/LoteList.js
const LoteList = ({ estado }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center bg-gray-800 p-4 rounded-lg">
        <span className="flex-1">"Nombre del lote"</span>
        <span className="text-gray-500">3/8/2024</span>
        <button className="ml-4 p-2 bg-gray-700 text-white rounded-lg">
          {estado === 'esperando' ? 'Esperando NFT' : 'Sin finalizar'}
        </button>
      </div>
    </div>
  );
};

export default LoteList;
