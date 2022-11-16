import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import Icon from '../assets/Icon.png';
import iconDark from '../assets/iconDark.png'

import DropdownNavbar from '../atoms/DropdownNavbar';
import Login from '../atoms/Login';
import Register from '../atoms/Register';

function NavbarAfterLogin() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);


  return (
    <div>
      <Navbar expand="lg" bg="dark" className="shadow p-2 mb-4 bg-body rounded">
        <Container>
          <Navbar.Brand href="#">
            <Link to="/Home">
              <img
                src={iconDark}
                width="160"
                height="45"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '50px' }}
              navbarScroll
            >
              {/* <Form className="d-flex">
              <Button variant="outline-success" className='mx-1' onClick={() => setShowLogin(true)}>Login</Button>
              <Button variant="primary" className="mx-1" onClick={() => setShowRegister(true)}>Register</Button>
            </Form> */}
              <DropdownNavbar />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Login show={showLogin} setShow={setShowLogin} setShowRegister={setShowRegister} />
      <Register show={showRegister} setShow={setShowRegister} setShowLogin={setShowLogin} />
    </div>
  );
}

export default NavbarAfterLogin;