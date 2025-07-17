import React from 'react'


import { http, createConfig, WagmiProvider, useSendTransaction } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useConnect } from 'wagmi'

const queryClient = new QueryClient()

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})



//////////////////////////////////////////////////////
function Wagmi() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletConnector />
        <EthSend />
      </QueryClientProvider>
    </WagmiProvider>
  )
}



function WalletConnector() {

    const { connectors, connect } = useConnect();

    return connectors.map((connector) => ((
        <button key={connector.uid} onClick={() => connect ({ connector})}>
            {connector.name}
        </button>
    ))
  )
}


function EthSend() {

    const {data: hash, sendTransaction} = useSendTransaction();

    function sendEth() {
        sendTransaction({
            to : document.getElementById('address').value,
            value: '100000000000000000', // 0.1 ETH in wei
        })
    }


    return (
        <div>
            <input type="text" id="address" placeholder="Enter recipient address" />
            <button onClick={sendEth}>Send 0.1 ETH</button>
            {hash}
        </div>
    )
}


export default Wagmi;




