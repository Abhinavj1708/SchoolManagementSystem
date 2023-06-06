import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink to="/" className="text-decoration-none text-light mx-2">User Registration</NavLink>
                    {/* <Nav className="me-auto"> */}
                        <NavLink to="/home" className="text-decoration-none text-light mx-2">Home&nbsp;</NavLink>
                        <NavLink to="/registerTeacher" className="text-decoration-none text-light">Teacherrecord&nbsp;</NavLink>
                        <NavLink to="/viewTeacher" className="text-decoration-none text-light">Teacherview&nbsp;</NavLink>
                        <NavLink to="/registerStudent" className="text-decoration-none text-light">Studentrecord&nbsp;</NavLink>
                        <NavLink to="/viewStudent" className="text-decoration-none text-light">Studentview&nbsp;</NavLink>
                    {/* </Nav> */}
                </Container>
            </Navbar>
        </>
    )
}

export default Header