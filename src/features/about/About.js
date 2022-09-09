import { useState } from "react"
import { Modal, ModalHeader, ModalBody, NavItem, NavLink } from "reactstrap"


const About = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <NavItem>
            <NavLink onClick={toggleOpen}>
                <h5>About</h5>
            </NavLink>
            <Modal isOpen={isOpen} toggle={toggleOpen} size="lg">
                <ModalHeader toggle={toggleOpen}>
                    <h3>About</h3>
                </ModalHeader>
                <ModalBody >
                    <h3>Pomo what?</h3> <hr />
                    <p>PomoTasks is based the on the <b>Pomodoro Technique</b> created by Francesco Cirillo.</p>
                    <p cite="https://en.wikipedia.org/wiki/Pomodoro_Technique"> "The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a kitchen timer to break work into intervals, typically 25 minutes in length, separated by short breaks.
                        Each interval is known as a pomodoro, from the Italian word for tomato, after the tomato-shaped kitchen timer Cirillo used as a university student" </p> <footer class="blockquote-footer"> <cite title="Pomodoro Technique - Wikipedia"> <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank" rel="noreferrer noopener">Wikipedia</a></cite></footer>
                    <h3>How to use PomoTasks</h3> <hr />
                    <ol>
                        <li>Add tasks.</li>
                        <li>Estimate the number of pomodoros from each task. Break up tasks greater than 5-7 pomodoros.</li>
                        <li>Choose a task to work on.</li>
                        <li>Start the timer and work on the task.</li>
                        <li>After the pomodoro ends, take a short 5 minute  break.</li>
                        <li>After every 4 pomodoros, take a longer 15-30 minute break.</li>
                    </ol>
                    <p>The default and recommended times are: 25 min for a pomodoro, 5 min for a short break and 15-30 minutes for a long break.
                        You can always change the time to suit your preferences.
                    </p>
                    <h3>Resources</h3> <hr />
                    <p>Read more about the Pomodoro Technique here: <a href="https://francescocirillo.com/products/the-pomodoro-technique" target="_blank" rel="noreferrer noopener">francescocirillo.com</a></p>
                    <p> For full details, read Cirillo's book: <a href="https://www.amazon.com/Pomodoro-Technique-Acclaimed-Time-Management-Transformed/dp/1524760706" target="_blank" rel="noreferrer noopener">The Pomodoro Technique</a>
                    </p>

                </ModalBody>
            </Modal>
        </NavItem>
    )
}

export default About;