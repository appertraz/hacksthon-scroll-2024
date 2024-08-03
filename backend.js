function serializer(key, value) {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
}

function useStorage(type = "local") {
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
DB EXAMPLE:
----------
const clients = [
  {
    id: 0,
    name: "name",
    minter: "0x378E58E2033dD69927398b1979dD39eFc3123a43",
    lots: [
      {
        id: 0,
        name: "name",
        status: "loading", // loading | minting | finished
        description: "description",
        nft: "0x378E58E2033dD69927398b1979dD39eFc3123a43",
      },
    ],
  },
];
*/

export function listClients() {
  return DB.get("clients") || [];
}

export function newClient(name) {
  const clients = DB.get("clients") || [];
  clients.push({
    id: getID(),
    name: name,
    minter: null,
    lots: [],
  });
  DB.set("clients", clients);
}

function setClient(clientId, field, value) {
  const clients = DB.get("clients") || [];
  const filteredClient = clients.filter((client) => client.id === clientId);
  if (filteredClient.length === 0) {
    throw new Error("Client not found");
  }
  filteredClient[0][field] = value;
  DB.set("clients", clients);
}

export function setClientMinter(clientId, minter) {
  return setClient(clientId, "minter", minter);
}

//-------------------------------------

export function listLots(clientId) {
  const clients = DB.get("clients") || [];
  const filteredClient = clients.filter((client) => client.id === clientId);
  if (filteredClient.length === 0) {
    throw new Error("Client not found");
  }
  return filteredClient[0].lots;
}

export function newLot(clientId, name) {
  const clients = DB.get("clients") || [];
  const filteredClient = clients.filter((client) => client.id === clientId);
  if (filteredClient.length === 0) {
    throw new Error("Client not found");
  }
  filteredClient[0].lots.push({
    id: getID(),
    name: name,
    status: "loading",
    description: null,
    nft: null,
  });
  DB.set("clients", clients);
}

function setLot(clientId, lotId, field, value) {
  const clients = DB.get("clients") || [];
  const filteredClient = clients.filter((client) => client.id === clientId);
  if (filteredClient.length === 0) {
    throw new Error("Client not found");
  }
  const filteredLot = filteredClient[0].lots.filter((lot) => lot.id === lotId);
  if (filteredLot.length === 0) {
    throw new Error("Lot not found");
  }
  filteredLot[0][field] = value;
  DB.set("clients", clients);
}

export function setLotDescription(clientId, lotId, description) {
  return setLot(clientId, lotId, "description", description);
}

export function setLotNft(clientId, lotId, nft) {
  return setLot(clientId, lotId, "nft", nft);
}

export function setLotStatus(clientId, lotId, status) {
  if (!["loading", "minting", "finished"].includes(status)) {
    throw new Error("Invalid status");
  }
  return setLot(clientId, lotId, "status", status);
}
