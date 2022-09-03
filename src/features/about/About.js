import { useState } from "react"
import { Modal, ModalHeader, ModalBody, NavItem } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from '@fortawesome/free-solid-svg-icons'

const About = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }
    return (
        <NavItem>
            <FontAwesomeIcon icon={faInfo} /> About
            <Modal isOpen={isOpen} toggle={toggleOpen}>
                <ModalHeader toggle={toggleOpen}>
                    About
                </ModalHeader>
                <ModalBody >
                </ModalBody>
            </Modal>
        </NavItem>
    )
}