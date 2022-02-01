import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-brands-svg-icons';
import { Card, Container, Row } from 'react-bootstrap'

export const TeamComponent = () => {
    return (
        <Container id="team" fluid >
            <Row className='px-5 d-flex justify-content-evenly'>
                <h3 className='text-center py-5'> Creator / Developer </h3>

                <Card className='col-sm-6 mb-5' style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="yintii.png" />
                    <Card.Body>
                        <Card.Title>Yintii</Card.Title>
                        <Card.Subtitle>Developer and Artist 💻 🎨</Card.Subtitle>
                        <Card.Text>
                            <hr />
                            Yintii.eth is an independent UI/UX JavaScript and Solidity developer. Originally an art student before switching into programming, this project is an accumulation of all his interests.
                        </Card.Text>
                        <div>
                            <a href="https://twitter.com/ominous_raspB" target="_blank">
                                <FontAwesomeIcon icon={icons.faTwitter} />
                            </a>
                        </div>
                    </Card.Body>
                </Card>
            </Row >
        </Container >
    )
}
