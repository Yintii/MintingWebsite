import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import Countdown from 'react-countdown';
import { Header } from './components/Header';
import { RoadMap } from './components/RoadMap';
import { TeamComponent } from './components/TeamComponent';
import { Footer } from './components/Footer';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { AdminDash } from './components/other/AdminDash';
import { Button, Col, Container, Row, ToastContainer, Toast, ProgressBar } from 'react-bootstrap'
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
  const price = 0.035;

  const inputSlide = useRef(null)
  const [currentAccount, setCurrentAccount] = useState(null);
  const CONTRACT_ADDRESS = "0x9ce01fa85b1e326ca8ec5ade69de0942109e37f8";

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
        setSuccessMsg(`Txn mined, see URL: https://etherscan.io/tx/${nftTxn.hash}`)
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

  const InputSlider = () => {
    return (
      <>
        <h2 className='py-5'>{numToMint}</h2>
        <input type="range"
          min="1"
          max="20"
          ref={inputSlide}
          value={numToMint}
          step="1"
          onChange={() => setNumToMint(inputSlide.current.value)}
        />
        0.035Ξ each
      </>
    )
  }

  //renderer for the minting component when the timer is done counting down
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed && minted === 5555) {
      return <h1>Sold out!</h1>
    } else if (completed && minted !== 5555) {
      // Render a completed state
      let subString = currentAccount.substr(0, 3) + "..." + currentAccount.substr(38, 42)
      return (
        <div className='text-center d-flex flex-column w-75 mx-auto'>
          <h6 className='border rounded p-3 mx-5'>Connected as: {subString}</h6>
          {!isMinting
            ? <InputSlider />
            : <img src="/dreaming.gif" alt="dreaming" width="512" height="206" />
          }


          <Button
            className='mt-2'
            variant='warning'
            onClick={askContractToMintNFT}
            disabled={isMinting}
          >
            Generate Dream(s)
          </Button>

          <ProgressBar
            variant='success'
            className='my-3 w-75 mx-auto my-5'
            animated now={(minted * 100) / 5555}
          />
          {minted} / 5555
        </div>
      )
    } else {
      // Render a countdown
      if (days === 1) {
        return (
          <>
            <h1 className='text-center'>Countdown ⏳</h1>
            <hr />
            <div className='count-down'>
              <table>
                <tr>
                  <th>day</th>
                  <th>hours</th>
                  <th>minutes</th>
                  <th>seconds</th>
                </tr>
                <th>
                  {days}
                </th>
                <th>
                  {hours}
                </th>
                <th>
                  {minutes}
                </th>
                <th>
                  {seconds}
                </th>
              </table>
            </div>
          </>

        )
      } else {
        return (
          <>
            <h1 className='text-center'>Countdown ⏳</h1>
            <hr />
            <div className='count-down'>
              <table>
                <tr>
                  <th>days</th>
                  <th>hours</th>
                  <th>minutes</th>
                  <th>seconds</th>
                </tr>
                <th>
                  {days}
                </th>
                <th>
                  {hours}
                </th>
                <th>
                  {minutes}
                </th>
                <th>
                  {seconds}
                </th>
              </table>
            </div>
          </>
        )
      }
    }
  };

  const GifComponent = () => {
    return (
      <Container fluid>
        <img src="bigDreams.gif" className='w-100' alt="headerbanner" />
      </Container>
    )
  }

  const GoToDesktop = () => {
    return (
      <Container id="Go-To-Desktop">
        <Row className='p-5 my-auto'>
          <h1>Oooops! This is embarassing..</h1>
          <span>Mint...kinda, sorta.. doesn't work on mobile. Meet me back on your laptop or computer please. I'm so excited to have you join the waste land!</span>
        </Row>
      </Container>
    )
  }

  //views
  const MintingComponent = () => {
    return (
      <Container id="mint" className="d-flex flex-column" fluid>
        <Row>
          <Col lg={6} className="p-5 mt-2 mx-auto" >
            <h1>Dream an electric dream of me</h1>
            <p>
              Poetry By Robots is a AI generative collection utilizing two machine learning models for text and images. Poetry and Art is generated from the perspective of post-apocalyptic automatons who've survived until worlds end.

              <hr />
              This project is experimental and the work of a single developer and artist. Be sure to let them know what you think of the works.<br />
              (Limit: 20 per wallet - 0.035Ξ each )
            </p>
          </Col>
          {currentAccount
            ? <Col md={6} className="mx-auto my-5 text-center" >
              <Countdown
                date={new Date('February 8, 2022 13:00:00')}
                renderer={renderer}
              />
            </Col>
            : <Col className='d-flex flex-column '>
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
        <GifComponent />
        <GoToDesktop />
        <MintingComponent />
        <RoadMap />
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
