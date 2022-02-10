import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export const RoadMap = () => {
    return (
        <Container id="roadmap" className='my-5 py-5' fluid>
            <Row>
                <h2 className='text-center'>RoadMap</h2>
                <Col sm={6} className="mx-auto">
                    <div className='p-5'>
                        <p>25% Collection sold</p>
                        <hr />
                        <li>Beginning of The Robotic Poet Society</li>
                        <p className='p-5'>
                            The Robotic Poet Society is meant to serve as a hub for creatives. An extra means of networking and learning, to connect with other artists and writers.
                            All holders are immediately entered into a giveaway to win another electric dream. (10 to giveaway)
                        </p>
                        <p>50% Collection sold</p>
                        <hr />
                        <li>Air drop special NFT to first holders</li>
                        <p className='p-5'>BONUS NFT - A special NFT will be airdropped to each wallet (via polygon) to mark you as an early member of The Robotic Poet Society.</p>
                        <p>75% Collection sold</p>
                        <hr />
                        <li>Bi-monthly poetry slams that reward 0.1 eth to winners</li>
                        <p className='p-5'>Writers are not appreciated or rewarded enough, and that's something PBR aims to change. We want to create a treasury that will be funded from sales of electric dreams, deposited monthly. These funds will be used to reward people for sharing their written works in public slams, voted on by community judges.</p>
                        <p>100% Collection sold</p>
                        <hr />
                        <li>Bi-monthly poetry slams become WEEKLY</li>
                        <li>10 eth donation, choosen by the community</li>
                        <p className='p-5'>
                            Once the project is fully sold out, we're going to increase our poetry slams and give back in a big way to... someone! That's going to be up to you and the other holders!
                        </p>
                        <p>FUTURE IDEAS</p>
                        <span className='text-muted'>Future ideas are NOT garunteed roadmap items. These are concepts, technologies, or simply a proposed project that I am not sure if it will or will not ultimately be developed.</span>
                        <hr />
                        <li>The Robotic Poet Society DAO</li>
                        <li>Community published poetry book</li>
                        <li>Metaverse gallery</li>
                        <li>Monthly Art contests(Similar to the poetry slams)</li>

                    </div>
                </Col>
            </Row>
        </Container>
    )
}
