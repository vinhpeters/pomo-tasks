import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Card, CardBody, CardHeader, Button, ButtonGroup, Modal, ModalBody, ModalHeader, Row, Container, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";
import convertSeconds from "../../utils/convertSeconds";
import useSound from "use-sound";
import alarmFx from "../../sounds/alarmFx.mp3"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faPauseCircle, faPlayCircle, faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { incrementPomoCount, selectActiveTask } from "../tasks/tasksSlice";
import { useDispatch } from "react-redux";
import TomatoOutline from "../../svg/tomato-outline.svg"
import TomatoColor from "../../svg/tomato-color.svg"

const Timer = () => {
    let activeTask = useSelector(selectActiveTask);

    const dispatch = useDispatch();

    let modes = {
        pomo: { name: 'pomodoro', time: 25 * 60 },
        sBreak: { name: 'short break', time: 5 * 60 },
        lBreak: { name: 'long break', time: 30 * 60 }

    }

    //State
    const [mode, setMode] = useState(modes.pomo);
    const [seconds, setSeconds] = useState(mode.time);
    const [isActive, setIsActive] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [counter, setCounter] = useState(0);


    // Main Timer 
    const tick = () => {
        setSeconds(prev => prev - 1);
    }

    useEffect(() => {

        const timerEnd = () => {
            playAlarm();
            if (mode.name === modes.sBreak.name) {
                changeMode(modes.pomo);
            }
            else if (mode.name === modes.pomo.name && counter !== 3) {
                if (activeTask) {
                    dispatch(incrementPomoCount(activeTask));
                }

                setCounter(counter + 1);
                changeMode(modes.sBreak);
            }

            else if (mode.name === modes.pomo.name && counter === 3) {
                if (activeTask) {
                    dispatch(incrementPomoCount(activeTask));
                }

                setCounter(counter + 1);
                changeMode(modes.lBreak);

            }

            else if (mode.name === modes.lBreak.name) {
                changeMode(modes.pomo);
                setCounter(0)
            }
            setIsModalOpen(true);
        }


        const interval = setInterval(() => {
            if (!isActive) {
                return;
            }
            if (seconds === 0) {
                return timerEnd();
            }

            tick();

        }, 1000);

        return () => clearInterval(interval);
    });

    //Sounds
    const [playAlarm, { stop: stopAlarm }] = useSound(
        alarmFx,
        { volume: 0.75 }
    );

    const stopTimer = () => {
        setIsActive(false);

    };
    const startTimer = () => {
        setIsActive(true);

    };

    const resetTimer = (mode) => {
        stopTimer();
        setSeconds(mode.time);

    };

    const skipTimer = () => {
        setSeconds(0)
    }

    const changeMode = (mode) => {
        setMode(mode)
        resetTimer(mode)
    };

    const toggleModal = () => {
        stopAlarm();
        setIsModalOpen(!isModalOpen);
        startTimer();
    };

    const changeTime = (modeToChange, newTime) => {

        modes[modeToChange].time = newTime * 60;
        changeMode(modes[modeToChange])

    }
    const TimerModal = () => {
        const Options = () => {

            if (mode.name === 'short break') {
                const modeToChange = 'sBreak';
                return (
                    <div>
                        <h2>Time for a break!</h2>
                        <ButtonGroup>
                            <Button color="success rounded" className="mx-1" onClick={() => changeTime(modeToChange, 3)}> 3 min </Button>
                            <Button color="success rounded" className="mx-1" onClick={() => changeTime(modeToChange, 4)}> 4 min </Button>
                            <Button color="success rounded" className="mx-1" onClick={() => changeTime(modeToChange, 5)}> 5 min </Button>
                        </ButtonGroup>
                    </div>
                )
            }

            if (mode.name === 'long break') {
                const modeToChange = 'lBreak';
                return (
                    <div>
                        <h2>Nice work! Time for a longer break!</h2>
                        <ButtonGroup>
                            <Button color="success rounded" className="mx-1" onClick={() => changeTime(modeToChange, 15)}> 15 min </Button>
                            <Button color="success rounded" className="mx-1" onClick={() => changeTime(modeToChange, 20)}> 20 min </Button>
                            <Button color="success rounded" className="mx-1" onClick={() => changeTime(modeToChange, 25)}> 30 min </Button>
                        </ButtonGroup>
                    </div>
                )
            }

            if (mode.name === 'pomodoro') {
                const modeToChange = 'pomo';
                return (
                    <div>
                        <h2>Time to focus!</h2>
                        <ButtonGroup>
                            <Button color="success rounded" className="mx-1" onClick={() => changeTime(modeToChange, 20)}> 20 min </Button>
                            <Button color="success rounded" className="mx-1" onClick={() => changeTime(modeToChange, 25)}> 25 min </Button>
                            <Button color="success rounded" className="mx-1" onClick={() => changeTime(modeToChange, 30)}> 30 min </Button>
                        </ButtonGroup>
                    </div>
                )
            }

        };

        return (
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                </ModalHeader>
                <ModalBody className="d-block-inline text-center" >
                    <Options />
                </ModalBody>
            </Modal>
        )
    };

    const TomatoBar = () => {
        let tomatoArray = Array(4)
        if (counter === 0) {
            tomatoArray.fill(TomatoOutline)
        }
        else if (counter > 0 && counter < 4) {

            for (let i = 0; i < counter; i++) {
                tomatoArray[i] = TomatoColor;
            }
            tomatoArray.fill(TomatoOutline, counter, 4)
        }
        else if (counter === 4) {
            tomatoArray.fill(TomatoColor)
        }
        return (
            <Col>
                {tomatoArray.map((tomato, index) => {
                    return (
                        <img className="m-1 tomato" key={index} src={tomato} ></img>
                    )
                })}

            </Col>
        )
    };

    return (
        <Container className="mt-0">
            <Row className="justify-content-center">
                <Col md="6">
                    <Card color="transparent">
                        <TimerModal />
                        <CardHeader className="text-center">
                            <Row className="justify-content-center align-items-center ">
                                <Col sm="12" >

                                    <UncontrolledDropdown group>
                                        <Button color={mode.name === modes.pomo.name ? "danger" : "success"} active={mode.name === modes.pomo.name} onClick={() => changeMode(modes.pomo)}>
                                            <span className="mode-btn"  >Pomodoro</span>
                                        </Button>
                                        <DropdownToggle caret color={mode.name === modes.pomo.name ? "danger" : "success"} active={mode.name === modes.pomo.name} />
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => changeTime('pomo', 20)}> 20 min</DropdownItem>
                                            <DropdownItem onClick={() => changeTime('pomo', 25)}> 25 min</DropdownItem>
                                            <DropdownItem onClick={() => changeTime('pomo', 30)}> 30 min</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>


                                    <UncontrolledDropdown group className="m-1">
                                        <Button color={mode.name === modes.sBreak.name ? "danger" : "success"} active={mode.name === modes.sBreak.name} onClick={() => changeMode(modes.sBreak)}>
                                            <span className="mode-btn"  >Short Break</span>
                                        </Button>
                                        <DropdownToggle caret className="mode-btn" color={mode.name === modes.sBreak.name ? "danger" : "success"} active={mode.name === modes.sBreak.name} />
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => changeTime('sBreak', 2)}> 2 min</DropdownItem>
                                            <DropdownItem onClick={() => changeTime('sBreak', 2)}> 3 min</DropdownItem>
                                            <DropdownItem onClick={() => changeTime('sBreak', 5)}> 5 min</DropdownItem>
                                        </DropdownMenu>

                                    </UncontrolledDropdown>

                                    <UncontrolledDropdown group>
                                        <Button color={mode.name === modes.lBreak.name ? "danger" : "success"} active={mode.name === modes.lBreak.name} onClick={() => changeMode(modes.lBreak)}>
                                            <span className="mode-btn"  >Long Break</span>
                                        </Button>
                                        <DropdownToggle className="mode-btn" caret color={mode.name === modes.lBreak.name ? "danger" : "success"} active={mode.name === modes.lBreak.name} />
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => changeTime('lBreak', 20)}> 20 min</DropdownItem>
                                            <DropdownItem onClick={() => changeTime('lBreak', 25)}> 25 min</DropdownItem>
                                            <DropdownItem onClick={() => changeTime('lBreak', 30)}> 30 min</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>


                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="text-center text-nowrap">
                            <h1 className="timer-text m-0 p-0" >{convertSeconds(seconds)} </h1>
                            <TomatoBar />
                            {activeTask && <p className="lead">{activeTask.name} {activeTask.pomoCount}{activeTask.pomoCountEst && <span>/{activeTask.pomoCountEst}</span>}</p>}
                            <Container>
                                <Row className="justify-content-center" >
                                    <Col sm="10" >
                                        <ButtonGroup>
                                            <Button color="danger" className="m-1 text-center rounded control-btn" onClick={() => resetTimer(mode)}>
                                                <FontAwesomeIcon icon={faArrowRotateRight} className='control-btn-icon' />
                                            </Button>
                                            {isActive ?
                                                <Button color="success" className="m-1 text-center rounded control-btn" onClick={stopTimer}>
                                                    <FontAwesomeIcon icon={faPauseCircle} className='control-btn-icon' />
                                                </Button>
                                                : <Button color="success" className="m-1 text-center rounded control-btn" onClick={startTimer}>
                                                    <FontAwesomeIcon icon={faPlayCircle} className='control-btn-icon' />
                                                </Button>}
                                            <Button color="danger" className="m-1 text-center rounded control-btn" onClick={skipTimer}>
                                                <FontAwesomeIcon icon={faForwardStep} className='control-btn-icon' />
                                            </Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </Container>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
};

export default Timer;