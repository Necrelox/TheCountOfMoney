import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'
import './navBar.css';
import { ExpansionPanelDescriptionMetadata } from 'igniteui-react-core';

interface IState {
    isExpired: boolean;
}

class NavBar extends React.Component<{}, IState> {
    expired: boolean;
    expiryDate: number;
    currentDate: number;
    stringDate: string;

    constructor(props: any) {
        super(props);
        this.expired = false;
        if(localStorage.getItem('expiryToken') != null) {
            this.stringDate = localStorage.getItem('expiryToken')?.split('T')[0] as string + " " + localStorage.getItem('expiryToken')?.split('T')[1].split('.')[0] as string;
            this.expiryDate = new Date(this.stringDate + "Z\"").getTime();
        } else {
            this.expiryDate = 0;
            this.stringDate = "";
        }
        this.state = {
            isExpired: this.expired
        }
        this.currentDate = new Date().getTime();
    }

    componentDidMount(): void {
        if(this.expiryDate < this.currentDate) {
            this.expired = true;
        } else {
            this.expired = false;
        }
        this.setState({isExpired: this.expired});
    }

    render() {
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
                {(localStorage.getItem('userRole') == "user" || localStorage.getItem('userRole') == "admin") && !this.state.isExpired
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
                {(localStorage.getItem('userRole') == "user" || localStorage.getItem('userRole') == "admin") && !this.state.isExpired 
                ? (
                    <Nav>
                        <Nav.Link href="logout">Logout</Nav.Link>
                    </Nav>
                    ) 
                : (
                    <Nav>
                        <Nav.Link href="register">Inscription</Nav.Link>
                        <Nav.Link className='navButton' href="login">Connexion</Nav.Link>
                    </Nav>
                )}
            </Navbar.Collapse>
            </Container>
        </Navbar>
        );
    }
  }

export default NavBar;