import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as icons from '@fortawesome/free-brands-svg-icons'

export const Header = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="#home">Poetry By Robots</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="#features">About</Nav.Link>
                        <Nav.Link href="#pricing">RoadMap</Nav.Link>
                        <Nav.Link href="#pricing">Contract</Nav.Link>
                    </Nav>
                    <Nav className='mx-5'>
                        <Nav.Link href="#">
                            <FontAwesomeIcon icon={icons.faDiscord} style={{ color: "grey" }} />
                        </Nav.Link>
                        <Nav.Link href="#">
                            <FontAwesomeIcon icon={icons.faTwitter} style={{ color: "grey" }} />
                        </Nav.Link>
                        <Nav.Link href="#">
                            <img src="/opensea3.png" alt="opensea icon" width="20px" />
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>Connect Wallet</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
