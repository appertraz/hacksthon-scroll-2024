const { ethers } = require("hardhat");

const RANDOM = false;
const DEBUG = false;
const CHARS = "abcdefghijklmnñopqrstuvwxyzáéíóú0123456789";

function getPseudoRandom(n) {
  // It use the Knuth multiplicative hash
  const hash = (BigInt(n) * 679535556991n) % 1099511627776n;
  return Number("0." + hash.toString().padStart(12, "0"));
}

const random = (() => {
  let num = 1;
  if (RANDOM) {
    return Math.random;
  } else {
    return () => getPseudoRandom(num++);
  }
})();

function getOneChar() {
  return CHARS[Math.floor(random() * CHARS.length)];
}

function genWord(length) {
  const chars = [];
  chars.push(getOneChar().toUpperCase());
  for (let i = 1; i < length; i++) {
    chars.push(getOneChar());
  }
  const word = chars.join("");
  if (DEBUG) {
    console.log({ word });
  }
  return word;
}

function genThreeWords(length) {
  /**
   *  With 2 spaces there are 3 words: 5 blocks
   *  pos         A              B
   *      |····|xxxxx|········|xxxxx|····|
   *      \___/\_____/\______/\_____/\___/
   *       ini  space  centre  space  end
   *        1     2       3      4     5
   */
  const block = length / 5;
  const posA = Math.floor((1 + random()) * block);
  const posB = Math.floor((3 + random()) * block);
  const len1 = posA;
  const len2 = posB - posA - 1;
  const len3 = length - posB - 1;
  return genWord(len1) + " " + genWord(len2) + " " + genWord(len3);
}

function genNum(min, max) {
  return Math.floor(min + random() * (max - min));
}

function getCompany() {
  let data;
  if (RANDOM) {
    data = { companyId: genNum(1, 100_000_000), companyName: genThreeWords(genNum(10, 40)) };
  } else {
    data = { companyId: 100, companyName: "Test Company Name" };
  }
  if (DEBUG) {
    console.log(data);
  }
  return data;
}

function getInterfaceId(signature) {
  return ethers.keccak256(ethers.toUtf8Bytes(signature)).slice(0, 10);
}

function validAddress(address) {
  return address !== ethers.ZeroAddress && ethers.isAddress(address);
}

module.exports = { genWord, getCompany, getInterfaceId, validAddress };
