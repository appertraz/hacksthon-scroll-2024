async function main() {
  const Factory = await ethers.getContractFactory("MinterFactory");
  const factory = await Factory.deploy();
  console.log(factory);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
