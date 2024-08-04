const FACTORY = "0x3DF865096D4561FBDD7f9424F2DD309E04371cBE";
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
