import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'
import './navBar.css';
import { ExpansionPanelDescriptionMetadata } from 'igniteui-react-core';

class NavBar extends React.Component {
    expired: boolean;
    expiryDate: Date;
    currentDate: Date;

    constructor(props: any) {
        super(props);
        this.expired = false;
        this.expiryDate = new Date(localStorage.getItem('expiryToken')!);
        this.currentDate = new Date();
    }

    componentDidMount(): void {
        if(this.expiryDate < this.currentDate) {
            this.expired = true;
        } else {
            this.expired = false;
        }
    }

    render() {
        let expiryDate = Date.parse(localStorage.getItem('expiryToken')!);
        let currentDate = Date.now();

        let connected;
        if(localStorage.getItem('userRole') == "user" || localStorage.getItem('userRole') == "admin" && expiryDate >= currentDate) {
            connected = <Nav.Link href="logout">Logout</Nav.Link>
        } else {
            connected = (<Nav>
                <Nav.Link href="register">Inscription</Nav.Link>
                <Nav.Link className='navButton' href="login">Connexion</Nav.Link>
                </Nav>)
        }

      return (
        <Navbar className="navColor" expand="lg">
            <Container fluid>
                <Image className='logo-img' src={require('../../../assets/Logo.png')} alt="IciOMine"/>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
                >
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="graphs">Graphs</Nav.Link>
                {localStorage.getItem('userRole') == "user" || localStorage.getItem('userRole') == "admin" && !this.expired
                ? <Nav.Link href="preferences">Preferences</Nav.Link> : null}
                </Nav>
                <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />  
                </Form>
                    {connected}
            </Navbar.Collapse>
            </Container>
        </Navbar>
        );
    }
  }

export default NavBar;