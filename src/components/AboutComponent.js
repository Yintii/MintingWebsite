import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'


export const AboutComponent = () => {
    return (
        <Container id="about" className='py-5' fluid>
            <Row className='p-5 text-center'>
                <Col sm={8} md={6} className='mx-auto'>
                    <h2>About</h2>

                    <p>
                        All poetry and images are generated via AI programatically, based on randomized prompts of various topics centered around a post-apocolyptic world. These poem and digital painting pairs are what we call "Electric Dreams" and are all unique, related only by topic and format.
                    </p>
                    <hr />
                    <p>
                        Poetry by Robots is laying the foundation for an autonomous DAO meant to financially reward writers: ran by the community, for the community. This will allow members to reward each other and prevent favoritism. Community ran events would autonomously award monthly winners and participants.
                    </p>
                    <hr />
                    <p>
                        Poetry By Robots will keep funds in reserve to continually award raffles winnings, contest and submission winnings, and writing sponsorships.
                    </p>
                </Col>
            </Row>
        </Container>
    )
}
