import './App.css';
import React, { useState, useEffect } from 'react'
import { Header } from './components/Header';
import { MintingComponent } from './components/MintingComponent';
import { RoadMapComponent } from './components/RoadMapComponent';
import { TeamComponent } from './components/TeamComponent';
import { AboutComponent } from './components/AboutComponent';
import { Footer } from './components/Footer';
import PoetryByRobots from './utils/PoetryByRobots.json'
import { ethers } from 'ethers';

function App() {

  const [currentAccount, setCurrentAccount] = useState(null);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window
    if (!ethereum) {
      console.log("Make sure you get metamask!")
      return true
    } else {
      console.log("We have the Ethereum object", ethereum)
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account");
      setCurrentAccount(account);
    } else {
      console.log("No Authorized account found")
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("COnnected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const askContractToMintNFT = async () => {
    const CONTRACT_ADDRESS = '0x211feA79e89f7ba6992FF275b7bCd7f65B954922';

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, PoetryByRobots.abi, signer);

        console.log("Poping wallet for gas...");

        let nftTxn = await connectedContract.electricDream();

        console.log("Mining...")
        await nftTxn.wait();
        console.log(`Txn mined, see URL: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`)
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])


  return (
    <div className="App">
      <Header />
      <main
        className='text-white'
        style={{
          backgroundColor: "#303952",
        }}>
        <MintingComponent
          walletIsConnected={currentAccount}
          connectWallet={() => connectWallet}
          mint={() => askContractToMintNFT}
        />
        <AboutComponent />
        <RoadMapComponent />
        <TeamComponent />
      </main>
      <Footer />

    </div >
  );
}

export default App;
