
const ClienteList = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center bg-gray-800 p-4 rounded-lg">
          
          <span className="flex-1">Cliente 1</span>
          <button className="text-red-600 hover:text-red-800">Eliminar</button>
        </div>
        <div className="flex items-center bg-gray-800 p-4 rounded-lg">
          
          <span className="flex-1">Cliente 2</span>
          <button className="text-red-600 hover:text-red-800">Eliminar</button>
        </div>
      </div>
    );
  };
  
  export default ClienteList;
  