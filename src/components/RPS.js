import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export const RPS = () => {
    return (
        <Container id="RPS" fluid>
            <Row className='py-5'>
                <Col sm={8} className='p-5 mx-auto'>
                    <h2>
                        The Robotic Poet Society
                    </h2>
                    <p className='py-3'>
                        The RPS is a community with writers in mind. Holders of Electric Dreams will be able to join The RPS. It is an optional group which requires your Electric Dreams to be unlisted. Poets will be able to participate in weekly poetry slams, monthly writing contests, and community recognition with rewards of Ether.
                    </p>
                </Col>
            </Row>
        </Container>
    )
}
