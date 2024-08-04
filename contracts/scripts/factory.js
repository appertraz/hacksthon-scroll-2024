const FACTORY = "0x04C3BD6d34059dF62443fd3FE2eeDEf18caE8BaE";
const COMPANY_ID = "1";
const COMPANY_NAME = "companyName";

async function main() {
  const Factory = await ethers.getContractFactory("MinterFactory");
  const transaction = await Factory.attach(FACTORY).createMinter(COMPANY_ID, COMPANY_NAME);
  console.log(transaction);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
