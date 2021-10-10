import React from 'react'
import Container from 'react-bootstrap/Container'
import Header from './layout/Header'

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <Container className="py-5" style={{ minHeight: 'calc(100vh - 196px)'}}>
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
