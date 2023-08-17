import React from 'react'
import Container from 'react-bootstrap/Container'
import Header from './Header'
import Footer from './Footer'

export default function PageLayout({ children }) {
    return (
        <>
            <Header />
            <Container className="py-5" style={{ minHeight: 'calc(100vh - 196px)'}}>
                {children}
            </Container>
            <Footer />
        </>
    )
}
