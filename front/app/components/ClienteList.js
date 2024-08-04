import { useRouter } from "next/navigation";

const Cliente = ({ id, name }) => {
  const router = useRouter();
  return (
    <div
      className="flex items-center bg-gray-800 p-4 rounded-lg cursor-pointer"
      onClick={() => router.push(`/vista2?cid=${id}`)}>
      <span className="flex-1">{name}</span>
      <button className="text-red-600 hover:text-red-800">Eliminar</button>
    </div>
  );
};

const ClienteList = ({ list }) => {
  return (
    <div className="space-y-4">
      {list.map((client) => (
        <Cliente key={client.id} id={client.id} name={client.name} />
      ))}
    </div>
  );
};

export default ClienteList;
