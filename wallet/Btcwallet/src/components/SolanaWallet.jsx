import React from 'react'
import { useState } from 'react'
import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl" 
// import generateWallet from './creds.js';


function Wallet() {

    const [mnemonic, setMnemonic] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);
    const [secretKey, setSecretKey] = useState([]);


  return (
    <>
    <div>Wallet</div>
        <button onClick={async function() {
            console
        const mn = await generateMnemonic();
        setMnemonic(mn);
        
        console.log("Mnemonic:", mn);

        }}>
        Create Seed Phrase
        </button>  
        <p>{mnemonic}</p>
        <button onClick={function(){
            const seed = mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keyPair = Keypair.fromSecretKey(secret);
            setCurrentIndex(currentIndex + 1);
            setPublicKeys([...publicKeys, keyPair.publicKey.toString('hex')]);
            setSecretKey([...secretKey, Buffer.from(secret).toString('hex')]);
            console.log("Public Key:", keyPair.publicKey.toString('hex'));
            console.log("Secret Key:", Buffer.from(secret).toString('hex'));
        }}>
            Add Wallet
        </button>
        <p>
            <strong>Public Keys:</strong> 
        </p>
        {publicKeys.map((p, i) => (
            <div key={i}>
                
                <p>
                   Account {i}: <input type="text" value={p} readOnly/>
                </p>
            </div>
        ))}
        
        <p>
            <strong>Secret Keys:</strong> 
        </p>
            {secretKey.map((p, i) => (
            <div key={i}>
                <p>
                    Account {i}: <input type="text" value={p} readOnly/>
                </p>
            </div>
        ))}

        <div className="showMnemonic">
            <button onClick={function(){
                if (!mnemonic) {
                    alert("Please generate a mnemonic first");
                    return;
                }
                <input type="text" value={mnemonic} readOnly />
                navigator.clipboard.writeText(mnemonic);
                alert("Mnemonic copied to clipboard");
            }}>Copy Mnemonic</button>
        </div>

    </>
    
  )
}

export default Wallet