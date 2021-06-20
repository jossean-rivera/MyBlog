import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import SignInButton from './SignInButton'
import SignOutLink from './SignOutButton'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'

export default function Layout({ children }) {
    const isAuthenticated = useIsAuthenticated()
    const { accounts } = useMsal();

    const name = accounts?.[0]?.name;

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">My Blog</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        {isAuthenticated ?
                            <Nav variant="dark">
                                <NavDropdown title={name}>
                                    <NavDropdown.Item href="#action3">Settings</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5"><SignOutLink /></NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            :
                            <SignInButton />
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="py-5" style={{ minHeight: '74vh'}}>
                {children}
            </Container>
            <div className="p-5 bg-dark text-white">
                <Container>
                    Footer
                </Container>
            </div>
        </>
    )
}
