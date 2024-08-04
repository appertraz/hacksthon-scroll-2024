"use client";

const File = ({ name }) => {
  return (
    <div className="flex items-center bg-gray-800 p-4 rounded-lg">
      <span className="flex-1">{name}</span>
      <button className="p-2 bg-gray-700 text-white rounded-lg ml-4">Editar</button>
      <button className="p-2 bg-red-600 text-white rounded-lg ml-2">Eliminar</button>
    </div>
  );
};

const FileList = ({ list }) => {
  return (
    <div className="space-y-4">
      {list?.map?.((file) => (
        <File key={file.id} name={file.name} />
      ))}
    </div>
  );
};

export default FileList;
