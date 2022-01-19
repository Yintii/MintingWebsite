import React, { useRef, useState, useEffect } from 'react'
import { Button, Col, Container, Row, Spinner, ToastContainer, Toast } from 'react-bootstrap'
import PoetryByRobots from '../utils/PoetryByRobots.json'
import { ethers } from 'ethers';


export const MintingComponent = (props) => {

    const [numToMint, setNumToMint] = useState(1);
    const [isMinting, setIsMinting] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const toggleErrorToast = () => setIsError(!isError);
    const toggleSuccessToast = () => setIsSuccess(!isSuccess);
    const price = 0.01;
    const inputSlide = useRef(null)

    const askContractToMintNFT = async () => {
        const CONTRACT_ADDRESS = props.CONTRACT_ADDRESS;

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
    const SuccessToast = () => {
        return (
            <ToastContainer className="p-3" position="bottom-end">
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
            </ToastContainer>
        )
    }

    const ErrorToast = () => {
        return (
            <ToastContainer className="p-3" position="bottom-end">
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
        )
    }

    return (
        <Container id="mint" fluid>
            <Row className='py-5 mt-5 px-5'>
                <Col sm={6} className='p-5 text-center'>
                    <h1>Dream an electric dream of me</h1>
                    <p>
                        Utilizing the new ERC721A implementation, we're cutting gas on bulk purchases. This is thanks to the talented people at the Azuki team. Check out their project and give them props for this wonderful gas savior.
                        <hr />
                        The gas that it costs to mint 1, is the same as the cost for 5. Grab as many as you'd like. (Limit: 10 per wallet)
                    </p>
                </Col>
                {props.walletIsConnected
                    ? <Col sm={6} className='text-center'>
                        <div className='range-slider'>
                            <h6 className='border rounded p-3'>Connected as: {props.walletIsConnected}</h6>
                            {!isMinting
                                ? <div>
                                    <h1 className='pt-5'>{numToMint}</h1>
                                    <input type="range"
                                        min="1"
                                        max="10"
                                        ref={inputSlide}
                                        value={numToMint}
                                        onChange={() => {
                                            setNumToMint(inputSlide.current.value);
                                        }}
                                        className='slider'
                                        id="sliderRange"
                                    />
                                </div>
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
                    </Col>
                    : <Col className='d-flex justify-content-center'>
                        <Button variant='warning' className='align-self-center' onClick={props.connectWallet()}>Connect Wallet</Button>
                    </Col>
                }
            </Row>
            <ErrorToast />
            <SuccessToast />
        </Container >

    )
}
