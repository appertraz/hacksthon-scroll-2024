import { useRouter } from "next/navigation";

const STATUS = {
  loading: "Sin finalizar",
  minting: "Esperando NFT",
  finished: "Lote listo",
};

const Lote = ({ id, name, status }) => {
  const router = useRouter();
  return (
    <div
      className="flex items-center bg-gray-800 p-4 rounded-lg cursor-pointer"
      onClick={() => router.push(`/vista3?lid=${id}`)}>
      <span className="flex-1">{name}</span>
      <span className="text-gray-500">4/8/2024</span>
      <button className="ml-4 p-2 bg-gray-700 text-white rounded-lg">{STATUS[status]}</button>
    </div>
  );
};

const LoteList = ({ list }) => {
  return (
    <div className="space-y-4">
      {list.map((lote) => (
        <Lote key={lote.id} id={lote.id} name={lote.name} status={lote.status} />
      ))}
    </div>
  );
};

export default LoteList;
