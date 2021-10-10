import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import './Header.scss'

function onSearchFocus(e) {
    if (!e.target.classList.contains('expanded')) {
        e.target.classList.add('expanded')
    }
}

function onSearchBlur(e) {
    if (e.target.classList.contains('expanded')) {
        e.target.classList.remove('expanded')
    }
}

export default function Header() {

    return (
        <header>
            <Container>
                <nav className="nav-links">
                    <ul>
                        <li>
                            <Link to="/">
                                Posts
                            </Link>
                        </li>
                        <li>
                            <Link to="/about">
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Link to="/" className="brand">
                    MyBlog<span className="period">.</span>
                </Link>
                <nav className="nav-search">
                    <ul>
                        <li>
                            <Form.Control placeholder="Search..." onFocus={onSearchFocus} onBlur={onSearchBlur} />
                        </li>
                    </ul>
                </nav>
            </Container>
        </header>
    )
}
