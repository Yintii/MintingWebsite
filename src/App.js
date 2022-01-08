import './App.css';
import React, { useState, useEffect } from 'react'
import { Nav } from 'react-bootstrap'
import { Header } from './components/Header';
import { MintingComponent } from './components/MintingComponent';
import { RPS } from './components/RPS';
import { RoadMapComponent } from './components/RoadMapComponent';
import { TeamComponent } from './components/TeamComponent';
import { AboutComponent } from './components/AboutComponent';
import { Footer } from './components/Footer';
import { Alert } from 'bootstrap';


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
        <MintingComponent walletIsConnected={currentAccount} connectWallet={() => connectWallet} />
        <AboutComponent />
        <RoadMapComponent />
        <TeamComponent />
      </main>
      <Footer />

    </div >
  );
}

export default App;
