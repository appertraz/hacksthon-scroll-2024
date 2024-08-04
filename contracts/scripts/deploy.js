async function main() {
    //
    // DEBERÍA verificarse si existe un archivo con el address del contrato depployado
    //         si existe detener el proceso, sino existe continuar y al final guardarlo
    //         el archivo de address debe depender si es en testnet o en mainnet
    //
    const [owner] = await ethers.getSigners();
    const Minter = await ethers.getContractFactory("Minter");
    const minter = await Minter.deploy(owner.address, 1, "Test Industry");
  
    console.log({ minter }); //////////////////////////////////////////////////////////
    //
    // WALLET 0x426E71ec8eF1a09B83c8477B1687533f5D5A7A26
    //
    // {
    //   minter: BaseContract {
    //     target: '0xffe8496b9a0E9DAB4486eDA1bc85262F8c7924e7',
    //     interface: Interface {
    //       fragments: [Array],
    //       deploy: [ConstructorFragment],
    //       fallback: null,
    //       receive: false
    //     },
    //     runner: HardhatEthersSigner {
    //       _gasLimit: undefined,
    //       address: '0x426E71ec8eF1a09B83c8477B1687533f5D5A7A26',
    //       provider: [HardhatEthersProvider]
    //     },
    //     filters: {},
    //     fallback: null,
    //     [Symbol(_ethersInternal_contract)]: {}
    //   }
    // }
    //
    // {
    //   minter: BaseContract {
    //     target: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    //     interface: Interface {
    //       fragments: [Array],
    //       deploy: [ConstructorFragment],
    //       fallback: null,
    //       receive: false
    //     },
    //     runner: HardhatEthersSigner {
    //       _gasLimit: 30000000,
    //       address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    //       provider: [HardhatEthersProvider]
    //     },
    //     filters: {},
    //     fallback: null,
    //     [Symbol(_ethersInternal_contract)]: {}
    //   }
    // }
  
    //await minter.deployed();
    // This solves the bug in Mumbai network where the contract address is not the real one
    //const txHash = minter.deployTransaction.hash;
    //const txReceipt = await ethers.provider.waitForTransaction(txHash);
    //const contractAddress = txReceipt.contractAddress;
    //console.log("Contract deployed to address:", contractAddress);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  