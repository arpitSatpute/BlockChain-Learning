import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletDisconnectButton, WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css'
import Airdrop from './Airdrop';

function App() {
  const wallets = [
    
  ];

  return (
    <>
      <h1>Welcome to Solana Wallet Adapter</h1>
      <p>Connect your wallet and start interacting with the Solana blockchain.</p>
      <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/JG6WAlrDxoHuKZPg2deVxr9uTdnMwSI8">
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <WalletMultiButton /> <br />
            <WalletDisconnectButton />
            Airdrop:
            <Airdrop />
            
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>

    </>
  )
}

export default App
