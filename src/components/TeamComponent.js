import React from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'

export const TeamComponent = () => {
    return (
        <Container id="team" fluid >
            <Row className='px-5 d-flex justify-content-evenly'>
                <h3 className='text-center py-5'> Team </h3>

                <Card className='col-sm-6 my-5' style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="yintii.png" />
                    <Card.Body>
                        <Card.Title>Kele "Yintii" Heart</Card.Title>
                        <Card.Subtitle>Developer and Artist 💻 🎨</Card.Subtitle>
                        <Card.Text>
                            Yintii.eth is a independent UI/UX JavaScript developer.
                        </Card.Text>
                        <Button variant="warning">
                            <a href="https://keleheart.com" taget="_blank">
                                Website
                            </a>
                        </Button>
                    </Card.Body>
                </Card>

                <Card className='col-sm-6 my-5' style={{ width: "18rem" }}>
                    <Card.Img variant="top" alt="New Team Member Picture" height="260px" />
                    <Card.Body>
                        <Card.Title>_______</Card.Title>
                        <Card.Subtitle>_______</Card.Subtitle>
                        <Card.Text>
                            _________________________________________________
                        </Card.Text>
                        <Button variant="warning">
                            <a href="#">_________</a>
                        </Button>
                    </Card.Body>
                </Card>


            </Row >
        </Container >
    )
}
