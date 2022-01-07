import React, { useRef, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

export const MintingComponent = () => {

    const [numToMint, setNumToMint] = useState(1);
    const inputSlide = useRef(null)


    const onSlide = () => {
        setNumToMint(inputSlide.current.value);
    }

    const alertNftAmount = () => {
        alert(`There is a reques for ${numToMint} NFTs`)
    }

    return (
        <Container id="mint" style={{ backgroundColor: "#5f5f5f" }} fluid>
            <Row>
                <Col className='text-white p-5'>
                    <h1>Generate some electric dreams</h1>
                    <p>
                        Utilizing the new ERC721A implementation, we're cutting gas onbulk purcahses.
                        The gas that it costs to mint 1, is the same as the cost for 5. Grab as many as you'd like.
                    </p>
                </Col>
                <Col className='text-white text-center p-5'>

                    <div className='range-slider'>
                        <h1>{numToMint}</h1>
                        <input type="range"
                            min="1"
                            max="20"
                            ref={inputSlide}
                            value={numToMint}
                            onChange={onSlide}
                            className='slider'
                            id="sliderRange"
                        />
                    </div>
                    <Button variant='warning' onClick={alertNftAmount}>
                        Generate Dream(s)
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}
