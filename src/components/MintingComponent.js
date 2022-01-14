import React, { useRef, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import PoetryByRobots from '../utils/PoetryByRobots.json'
import { ethers } from 'ethers';


export const MintingComponent = (props) => {

    const [numToMint, setNumToMint] = useState(1);
    const price = 0.05;
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

    return (
        <Container id="mint" fluid>
            <Row className='py-5 mt-5 px-5'>
                <Col sm={6} className='p-5 text-center'>
                    <h1>Dream an electric dream of me</h1>
                    <p>
                        Utilizing the new ERC721A implementation, we're cutting gas onbulk purcahses.
                        The gas that it costs to mint 1, is the same as the cost for 5. Grab as many as you'd like.
                    </p>
                </Col>
                {props.walletIsConnected
                    ? <Col sm={6} className='text-center'>

                        <div className='range-slider'>
                            <h6 className='border rounded p-3'>Connected as: {props.walletIsConnected}</h6>

                            <h1 className='pt-5'>{numToMint}</h1>
                            <input type="range"
                                min="1"
                                max="5"
                                ref={inputSlide}
                                value={numToMint}
                                onChange={() => {
                                    setNumToMint(inputSlide.current.value);
                                }}
                                className='slider'
                                id="sliderRange"
                            />
                        </div>
                        <Button
                            className='mt-2'
                            variant='warning'
                            onClick={askContractToMintNFT}
                        >
                            Generate Dream(s)
                        </Button>
                    </Col>
                    : <Col className='d-flex justify-content-center'>
                        <Button variant='warning' className='align-self-center' onClick={props.connectWallet()}>Connect Wallet</Button>
                    </Col>
                }
            </Row>
        </Container>
    )
}
