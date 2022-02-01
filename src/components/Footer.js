import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

export const Footer = () => {
    return (
        <Container style={{ backgroundColor: "#21252A" }} fluid>
            <Row>
                <Col className='my-5' sm={12}>
                    <h4 className='text-center'>
                        <a id="backToTop" href="#">
                            Back to the top
                        </a>
                    </h4>
                </Col>
            </Row>
        </Container>
    )
}
