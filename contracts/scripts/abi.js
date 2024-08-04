const fs = require("fs");

const contracts = ["MinterFactory", "Minter"];

const src = "artifacts/contracts";
const dst = "contracts";

function getAbi(contract) {
  const json = `${src}/${contract}.sol/${contract}.json`;
  const abi = `${dst}/${contract}.abi`;
  if (fs.existsSync(json)) {
    const data = fs.readFileSync(json);
    fs.writeFileSync(abi, JSON.stringify(JSON.parse(data).abi));
  } else {
    console.log(`${contract}.sol not compiled`);
  }
}

for (const contract of contracts) {
  getAbi(contract);
}
