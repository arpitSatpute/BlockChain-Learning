// import { generateMnemonic, mnemonicToSeedSync } from "bip39";
// import nacl from "tweetnacl";
// import {derivePath} from "ed25519-hd-key";


// const mnemonic = generateMnemonic(256); // Generate a 24-word mnemonic
// console.log("Mnemonic:", mnemonic);
// const seed = mnemonicToSeedSync(mnemonic);
// console.log("Seed:", seed.toString('hex'));

// for(let i=0; i<4; i++) {
//     const path = `m/44'/501'/${i}'/0';
//     const derivedSeed = derivePath(path, seed.toString("hex")).key;`
//     const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
//     const keypair = Keypair.fromSecretKey(secret);
//     console.log()
// }
// console.log("Public Key:", keypair.publicKey.toBase58());
// console.log("Secret Key:", keypair.secretKey.toString('hex'));




import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

const mnemonic = generateMnemonic();
const seed = mnemonicToSeedSync(mnemonic);
for (let i = 0; i < 4; i++) {
  const path = `m/44'/501'/${i}'/0'`; // This is the derivation path
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  console.log("Public:->. ", Keypair.fromSecretKey(secret).publicKey.toBase58());
  console.log("Secret:->. ", Buffer.from(secret).toString('hex'));
}