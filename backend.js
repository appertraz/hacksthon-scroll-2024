function serializer(key, value) {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
}

export default function useStorage(type = "local") {
  const storage = `${type}Storage`; /* local | session */

  const toStore = (obj) => JSON.stringify(obj, serializer);
  const fromStore = (str) => (str ? JSON.parse(str) : undefined);

  const get = (key) => fromStore(window?.[storage]?.getItem(key));
  const set = (key, value) => window?.[storage]?.setItem(key, toStore(value));

  const remove = (key) => window?.[storage]?.removeItem(key);
  const clear = () => window?.[storage]?.clear();

  const pop = (key) => {
    const value = get(key);
    remove(key);
    return value;
  };

  return { get, set, remove, clear, pop };
}

const DB = useStorage("local");

function getID() {
  return Math.random().toString(36).slice(2, 8) + (Date.now() - 1722706200000).toString();
}

//-------------------------------------

/*
DB FORMAT:
---------

const clients = [
  {
    id: 0,
    name: "name",
    minter: "0x378E58E2033dD69927398b1979dD39eFc3123a43",
    lots: [
      {
        id: 0,
        name: "name",
        description: "description",
        nft: "0x378E58E2033dD69927398b1979dD39eFc3123a43",
      },
    ],
  },
];
*/

export async function newClient(nombre) {
  //
  // TODO: implement, return ID
  //
}

export async function listClients() {
  //
  // TODO: implement
  //
}

export async function newLot(clientId, name, description) {
  //
  // TODO: implement, return ID
  //
}

export async function listLots() {
  //
  // TODO: implement
  //
}
