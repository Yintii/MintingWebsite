import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-brands-svg-icons';
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

export const Footer = () => {
    return (
        <Container style={{ backgroundColor: "#21252A" }} fluid>
            <Row>
                <Col sm={12} md={6} className='mx-auto d-flex justify-content-around p-5'>
                    <a className='footer-social' href="#" target='_blank'>
                        <FontAwesomeIcon icon={icons.faDiscord} />
                    </a>
                    <a className='footer-social' href="#" target='_blank'>
                        <FontAwesomeIcon icon={icons.faTwitter} />
                    </a>
                    <a className='footer-social' href="#" target='_blank'>
                        <img src="opensea2.png" width="20px" alt="opensea.png" />
                    </a>
                </Col>
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
