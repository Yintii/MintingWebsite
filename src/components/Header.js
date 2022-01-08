import React, { useEffect } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as icons from '@fortawesome/free-brands-svg-icons'

export const Header = (props) => {
    return (
        <Navbar className='fixed-top' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#">Poetry By Robots</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="#mint">Mint</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link href="#roadmap">RoadMap</Nav.Link>
                        <Nav.Link href="#team">Team</Nav.Link>
                        <Nav.Link href="#" target="_blank">Contract</Nav.Link>
                    </Nav>
                    <Nav className='mx-5'>
                        <Nav.Link href="#">
                            <FontAwesomeIcon icon={icons.faDiscord} style={{ color: "grey" }} />
                        </Nav.Link>
                        <Nav.Link href="https://twitter.com/PoetryByRobots" target="_blank">
                            <FontAwesomeIcon icon={icons.faTwitter} style={{ color: "grey" }} />
                        </Nav.Link>
                        <Nav.Link href="#">
                            <img src="/opensea3.png" alt="opensea icon" width="20px" />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
