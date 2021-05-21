import React, { Component,Fragment } from 'react';
import { Navbar, Nav, Button,Form, FormControl, NavDropdown, Modal, Table} from 'react-bootstrap';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

        
        this.state = {
            title: '',
            contents: '',
        }
    }
    render() {
        return (
            <Navbar className="color-nav" variant="dark">
            <Navbar.Brand href="/minbeom">홍수빈's 공간</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/minbeom/calendar">켈린더</Nav.Link>
                <Nav.Link href="/minbeom/board">베이킹</Nav.Link>
                <NavDropdown title="일기" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/">가족일기</NavDropdown.Item>
                    <NavDropdown.Item href="/">육아일기</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/minbeom/accountbook">가계부</Nav.Link>
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
            </Form>
            </Navbar>
        );
    }
}

export default HeaderComponent;