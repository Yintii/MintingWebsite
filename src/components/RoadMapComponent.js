import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export const RoadMapComponent = () => {
    return (
        <Container id="roadmap" fluid>
            <Row className='py-5 d-flex flex-column'>
                <Col xs={6} className='p-5 mx-auto'>
                    <h3 className='text-center' >Road map</h3>
                    <div id="pre-sale" className='in-progress'>
                        <p>Pre-sale</p>
                        <hr />
                        <ul className='in-progress pb-5'>
                            <li>
                                1000 <a href="#" style={{ color: "#7387D9" }}>Discord</a> Members
                            </li>
                            <li>
                                1000 <a href="#" className='text-info'>Twitter</a> Followers
                            </li>
                        </ul>
                    </div>
                    <div id="post-sale" class="to-do">
                        <p>Post Sale</p>
                        <hr />
                        <p>25% of collection sold</p>
                        <ul>
                            <li>Giveaway 5 poems</li>
                            <li>First poetry slam (TBD)</li>
                            <li></li>
                        </ul>
                    </div>
                </Col>
                <Col className="w-50 mx-auto border border-light rounded">
                    <p className='text-center pt-3'>Key</p>
                    <ul className='d-flex justify-content-evenly' style={{ listStyleType: "square" }}>
                        <li className='completed'>Completed</li>
                        <li className='in-progress'>In Progress</li>
                        <li className='to-do'>To do</li>
                    </ul>
                </Col>
            </Row >
        </Container >
    )
}
