import { Navbar,  Collapse, NavbarToggler, Nav,  Row, Col, Container } from "reactstrap";
import React, { useState } from "react";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col className="mb-0 text-center" md='6'>
                    <Navbar className=" m-0" expand="sm">
                            <h3>PomoTasks</h3>
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
