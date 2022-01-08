import React, { useRef, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'


export const MintingComponent = (props) => {

    const [numToMint, setNumToMint] = useState(1);
    const inputSlide = useRef(null)

    const RenderNotConnected = () => {
        return (
            <Col sm={6} className='d-flex'>
                <Button
                    variant='warning'
                    className="align-self-center mx-auto"
                    onClick={props.connectWallet()}
                >
                    Connect Wallet
                </Button>
            </Col>
        )
    }

    const MintingUI = () => {
        return (
            <Col sm={6} className='text-center'>

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
                    onClick={props.mint()}
                >
                    Generate Dream(s)
                </Button>
            </Col>
        )
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
                {props.walletIsConnected == null ? <RenderNotConnected /> : <MintingUI />}
            </Row>
        </Container>
    )
}
