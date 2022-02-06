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
                        <Nav.Link href="#team">Creator</Nav.Link>
                        <Nav.Link href="https://etherscan.io/address/0x9ce01fa85b1e326ca8ec5ade69de0942109e37f8" target="_blank">Contract</Nav.Link>
                    </Nav>
                    <Nav className='mx-5'>
                        <Nav.Link href="https://twitter.com/PoetryByRobots" target="_blank">
                            <FontAwesomeIcon icon={icons.faTwitter} style={{ color: "#1C9AEE" }} />
                        </Nav.Link>
                        <Nav.Link href="#">
                            <img src="/opensea.png" alt="opensea icon" width="20px" />
                        </Nav.Link>
                        <Nav.Link href="#">
                            <img src="/looksrare.png" alt="LooksRare icon" width="20px" />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
