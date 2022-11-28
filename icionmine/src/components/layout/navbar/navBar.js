import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'
import './navBar.css';

class NavBar extends React.Component {
    render() {
      return (
        <Navbar className="navColor" expand="lg">
            <Container fluid>
                <Image className='logo-img' src={require('../../../assets/Logo.png')} alt="IciOMine" class='logo-img' />
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
                >
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#graphs">Graphs</Nav.Link>
                <Nav.Link href="#preferences">Preferences</Nav.Link>
                </Nav>
                <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />  
                </Form>
                <Nav>
                    <Nav.Link href="#login">Connection</Nav.Link>
                    <Nav.Link className='navButton' href="#register">Inscription</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        );
    }
  }

export default NavBar;