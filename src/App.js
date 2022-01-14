import './App.css';
import React, { useState, useEffect } from 'react'
import { Header } from './components/Header';
import { MintingComponent } from './components/MintingComponent';
import { RoadMapComponent } from './components/RoadMapComponent';
import { TeamComponent } from './components/TeamComponent';
import { AboutComponent } from './components/AboutComponent';
import { Footer } from './components/Footer';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { AdminDash } from './components/other/AdminDash';


function App(props) {

  const [currentAccount, setCurrentAccount] = useState(null);
  const CONTRACT_ADDRESS = "0x2dC7dF8eB5183A257390BC80dc45c40e1820C0D4";

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

  const Main = () => {
    return (
      <main
        className='text-white'
        style={{
          backgroundColor: "#303952",
        }}>
        <MintingComponent
          walletIsConnected={currentAccount}
          connectWallet={() => connectWallet}
          CONTRACT_ADDRESS={CONTRACT_ADDRESS}
        />
        <AboutComponent />
        <RoadMapComponent />
        <TeamComponent />
      </main>
    );
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/admin" render={() => <AdminDash user={currentAccount} CONTRACT_ADDRESS={CONTRACT_ADDRESS} />} />
        <Redirect to="/" />
      </Switch>
      <Footer />

    </div >
  );
}


export default withRouter(App);
