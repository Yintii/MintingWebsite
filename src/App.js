import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import Countdown from 'react-countdown';
import { Header } from './components/Header';
import { TeamComponent } from './components/TeamComponent';
import { Footer } from './components/Footer';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { AdminDash } from './components/other/AdminDash';
import { Button, Col, Container, Row, Spinner, ToastContainer, Toast, ProgressBar } from 'react-bootstrap'
import PoetryByRobots from './utils/PoetryByRobots.json'
import { ethers } from 'ethers';

function App(props) {

  //how many the user is planing to mint
  const [numToMint, setNumToMint] = useState(1);
  const [minted, setMinted] = useState(0);

  //for loading states and toasts
  const [isMinting, setIsMinting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  //toast msgs
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  //bools to toggle toasts
  const toggleErrorToast = () => setIsError(!isError);
  const toggleSuccessToast = () => setIsSuccess(!isSuccess);



  //NFT price
  const price = 0.01;

  const inputSlide = useRef(null)
  const [currentAccount, setCurrentAccount] = useState(null);
  const CONTRACT_ADDRESS = "0x98C14533eB7beA14424d3e76A8C5d0A8b79b73Ff";

  //functions
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

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, PoetryByRobots.abi, signer);

        console.log("Poping wallet for gas...");

        let cost = (numToMint * price).toString();

        let nftTxn = await connectedContract.electricDream(numToMint, { value: ethers.utils.parseEther(cost) });

        setIsMinting(true);
        console.log("Mining...")
        await nftTxn.wait();
        setSuccessMsg(`Txn mined, see URL: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`)
        setIsMinting(false);
        toggleSuccessToast();
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (error) {
      setErrMsg(error.message);
      toggleErrorToast()
    }
  }
  const checkMintedCount = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, PoetryByRobots.abi, signer);

        let supply = await connectedContract.totalSupply();

        console.log("Supply: ", supply.toNumber());
        setMinted(supply.toNumber());

      }
    } catch (err) {
      console.error(err);
    }
  }

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return (
        <>
          <div className='range-slider'>
            <h6 className='border rounded px-5 py-2 w-100'>Connected as: {currentAccount}</h6>
            {!isMinting
              ? <>
                <h1 className='py-5'>{numToMint}</h1>
                <input type="range"
                  min="1"
                  max="10"
                  ref={inputSlide}
                  value={numToMint}
                  onChange={() => setNumToMint(inputSlide.current.value)}
                  className='slider'
                  id="sliderRange"
                />
              </>
              : <Spinner animation='border' role="status"></Spinner>
            }

          </div>
          <Button
            className='mt-2'
            variant='warning'
            onClick={askContractToMintNFT}
            disabled={isMinting}
          >
            Generate Dream(s)
          </Button>

          <ProgressBar variant='warning' className='my-3' animated now={(minted * 100) / 5555} />
          {minted} / 5555
        </>
      )
    } else {
      // Render a countdown
      if (days === 1) {
        return (
          <p style={{ fontSize: "40px" }}>
            📆 {days} Day <br />
            ⏰ {hours}:{minutes}:{seconds}
          </p>
        )
      } else {
        return (
          <p style={{ fontSize: "40px" }}>
            📆 {days} Days <br />
            ⏰ {hours}:{minutes}:{seconds}
          </p>
        )
      }
    }
  };

  //views
  const MintingComponent = () => {
    return (
      <Container id="mint" fluid>
        <Row className='py-5 mt-5 p-5'>
          <Col sm={6} className='p-5 text-center'>
            <h1>Dream an electric dream of me</h1>
            <p>
              A random prompt is generated to be fed to two seperate machine learning models, one for word generation, the other for image generation. These two pieces come together into an electric dream, a beautiful fusion of poetry and digital artwork.
              <hr />
              This project is experimental and the work of a single developer and artist. Be sure to let them know what you think of the works.<br />
              (Limit: 20 per wallet)
            </p>
          </Col>
          {currentAccount
            ? <Col sm={6} className='text-center my-auto'>
              <Countdown
                date={new Date('February 8, 2022 13:00:00')}
                renderer={renderer}
              />
            </Col>
            : <Col className='d-flex justify-content-center'>
              <Button variant='warning' className='align-self-center' onClick={connectWallet()}>Connect Wallet</Button>
            </Col>
          }
        </Row>
      </Container >

    )
  }

  const Toasts = () => {
    return (
      <>
        <ToastContainer id="notifs" className="p-2">
          <Toast show={isSuccess} onClose={toggleSuccessToast}>
            <Toast.Header closeButton={true}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Poetry By Robots</strong>
              <small>Contract message</small>
            </Toast.Header>
            <Toast.Body className='text-white bg-success'>{successMsg}</Toast.Body>
          </Toast>
          <Toast show={isError} onClose={toggleErrorToast}>
            <Toast.Header closeButton={true}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Poetry By Robots</strong>
              <small>Contract Error</small>
            </Toast.Header>
            <Toast.Body className='text-white bg-danger'>{errMsg}</Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    )
  }

  const Main = () => {
    return (
      <main className='text-white' style={{
        backgroundColor: "#303952",
      }}>
        <MintingComponent />
        <TeamComponent />
        <Toasts />
      </main>
    );
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    checkMintedCount();
  }, [minted])


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
