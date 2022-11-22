import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'

class NavBar extends React.Component {
    render() {
      return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Image src='https://cdn.discordapp.com/attachments/1042840275485196303/1044567747562045460/IciOnMineLogo.png'/>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
                >
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Graphs</Nav.Link>
                <Nav.Link href="#action2">Preferences</Nav.Link>
                </Nav>
                <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
                </Form>
                <Nav>
                    <Nav.Link href="#action1">Connection</Nav.Link>
                    <Nav.Link href="#action2">Inscription</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        );
    }
  }

export default NavBar;