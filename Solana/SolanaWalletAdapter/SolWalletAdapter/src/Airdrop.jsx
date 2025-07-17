import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React from 'react'
import { useState, useEffect } from 'react'

function Airdrop() {
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const wallet = useWallet();
    const {connection} = useConnection();

    // Function to fetch wallet balance
    const getBalance = async () => {
        if (wallet.publicKey) {
            try {
                const balance = await connection.getBalance(wallet.publicKey);
                setBalance(balance / 1000000000); // Convert lamports to SOL
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        }
    };

    // Fetch balance when wallet connects or changes
    useEffect(() => {
        if (wallet.connected && wallet.publicKey) {
            getBalance();
        } else {
            setBalance(0);
        }
    }, [wallet.connected, wallet.publicKey, connection]);

    const sendAirdrop = async () => {
        if (!wallet.connected) {
            alert('Please connect your wallet first.');
            return;
        }
        try {
            await connection.requestAirdrop(wallet.publicKey, amount * 1000000000);
            alert('Airdrop request sent! Check your wallet balance.');
            // Refresh balance after airdrop
            setTimeout(() => {
                getBalance();
            }, 2000); // Wait 2 seconds before refreshing balance
        } catch (error) {
            console.error('Airdrop error:', error);
            alert('Airdrop failed. Please try again.');
        }
    }

    return (
        <div>
            <label>
                Enter Amount for Airdrop:
                <br />
                <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount in sol'/>
            </label>
            <br />
            <button onClick={sendAirdrop}>Airdrop</button>
            <br />
            <button onClick={getBalance}>Refresh Balance</button>
            <div className="walletInfo">
                <strong>Wallet connected:</strong> {wallet.connected ? 'Yes' : 'No'}
                <br />
                <strong>Wallet address:</strong> {wallet.publicKey ? wallet.publicKey.toBase58() : 'Not connected'}
                <br />
                <strong>Wallet balance:</strong> {wallet.connected ? `${balance} SOL` : 'Not connected'}
            </div>
        </div>
    )
}

export default Airdrop