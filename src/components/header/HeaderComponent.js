import React, { Component,Fragment } from 'react';
import './HeaderComponent.css';
import { BrowserView, MobileView, isBrowser, isMobile} from 'react-device-detect';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

        
        this.state = {
            title: '',
            contents: '',
        }
    }
    render() { 
        const hstyle = {
            fontSize: '3vw'
        }
        return (
            <Fragment>
                <BrowserView>
                    <Navbar className="nav-main" variant="dark">
                        <Navbar.Brand className="nav-title" href="/minbeom">홍수빈's 공간</Navbar.Brand>
                        <Nav className="nav-contents">
                            <Nav.Link className="nav-contents-calendar" href="/minbeom/calendar">켈린더</Nav.Link>
                            <Nav.Link className="nav-contents-baking" href="/minbeom/board">베이킹</Nav.Link>
                            <NavDropdown className="nav-contents-story" title="일기" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/">가족일기</NavDropdown.Item>
                                <NavDropdown.Item href="/">육아일기</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link className="nav-contents-account" href="/minbeom/accountbook">가계부</Nav.Link>
                        </Nav>
                    </Navbar>
                </BrowserView>
                <MobileView>
                    <Navbar className="mobile-nav-main" variant="dark">
                        <Navbar.Brand className="mobile-nav-title" style={hstyle} href="/minbeom">홍수빈's 공간</Navbar.Brand>
                        <Nav className="mobile-nav-contents">
                            <Nav.Link className="mobile-nav-contents-calendar" href="/minbeom/calendar">켈린더</Nav.Link>
                            <Nav.Link className="mobile-nav-contents-baking" href="/minbeom/board">베이킹</Nav.Link>
                            <NavDropdown className="mobile-nav-contents-story" title="일기" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/">가족일기</NavDropdown.Item>
                                <NavDropdown.Item href="/">육아일기</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link className="mobile-nav-contents-account" href="/minbeom/accountbook">가계부</Nav.Link>
                        </Nav>
                    </Navbar>
                </MobileView>
            </Fragment>
        );
    }
}

export default HeaderComponent;