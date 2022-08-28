import { Navbar, NavbarBrand, Collapse, NavbarToggler, Nav, NavItem, Row, Col, Container } from "reactstrap";
import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col className="mb-2 text-center" sm='10'>
                    <Navbar className=" m-0" expand="sm">
                            <h1 className="mx-n3">PomoTasks!</h1>
                        <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />
                        <Collapse isOpen={menuOpen} navbar>
                            <Nav className="ms-auto" navbar>

                            </Nav>
                        </Collapse >
                    </Navbar >
                </Col>
            </Row>
        </Container>
    );
};

export default Header;
