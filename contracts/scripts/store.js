import { NFTStorage, File } from "nft.storage";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.NFT_STORAGE_API_KEY;

async function main() {
  const client = new NFTStorage({ token: API_KEY });
  const metadata = await client.store({
    name: "ID: OC 21096-GOOD FOOD-OP 1576 DESPACHO 09/11/23",
    description: `FORMAT: sha2-256 file-size file-name

    ID: OC 21096-GOOD FOOD-OP 1576 DESPACHO 09/11/23
    
    b0427f9e9889df2ba7efded19441489e7d4c9cce392fe1b06c68e818645d6f09 436373 GOOD FOOD PT 09.11.23.pdf
    
    5fe044a8bf3b0ef6a66b2454b5b0a113376509936bae78e9263074d486ad77f8 89852 09.11.2023 - CAL-INT-REG-64 CERT. DE LIB. (Edulc. Abedul).pdf
    
    9a7c9321c6acc472cfce6cd0801d3824f1f24fb18eefc6f1371b721212049ce4 123390 09-11-23-ED.ABEDUL-GOOD FOOD.pdf
    
    1db4e6724435f513a7405b38f8eed1f1be6510aea27ef7d9144b90310bc1f938 37694 Remito Nº 2324 Good Food - Edulc Abedul 9-11-23.pdf
    
    a640a1e5d1c0e80db59c0f73daf5b610aa00aceb660b21c83060cf031a4211d2 16968 ROMANEO Edulcorante Abedul 09.11.23.pdf`,
    image: new File(
      [await fs.promises.readFile("assets/SudamericaEmbalajesSRL.jpg")],
      "SudamericaEmbalajesSRL.jpg",
      {
        type: "image/jpg",
      }
    ),
  });
  console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
