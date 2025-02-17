const FACTORY = "0x04C3BD6d34059dF62443fd3FE2eeDEf18caE8BaE";
const COMPANY_ID = "1";
const IPFS = "ipfs://bafyreig7skoljg6tvymy2q4iah5ye5hesxhghsl5umsxvlhx4iasfof2uq/metadata.json";

async function main() {
  const Factory = await ethers.getContractFactory("MinterFactory");
  const minter = await Factory.attach(FACTORY).getContractAddress(COMPANY_ID);
  console.log(minter);

  const Minter = await ethers.getContractFactory("Minter");
  const transaction = await Minter.attach(minter).mint(IPFS);
  console.log(transaction); // hash of NFT
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
