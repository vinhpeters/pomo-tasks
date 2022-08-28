import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Card, CardBody, CardHeader, Button, Modal, ModalBody,  ModalHeader, Row, Container } from "reactstrap";
import convertSeconds from "../../utils/convertSeconds";
import useSound from "use-sound";
import alarmFx from "../../sounds/alarmFx.mp3"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faPauseCircle, faPlayCircle, fa } from '@fortawesome/free-solid-svg-icons';
import ActiveTask from "./ActiveTask";
import { incrementPomoCount, selectActiveTask } from "../tasks/tasksSlice";
import { useDispatch } from "react-redux";
import Tomato from "../../svg/tomato.svg"

const Timer = () => {
    let activeTask = useSelector(selectActiveTask);
    const dispatch = useDispatch()
    let modes = {
        pomo: { name: 'pomodoro', time: 5 },
        sBreak: { name: 'short break', time: 2 },
        lBreak: { name: 'long break', time: 10 }

    }

    //State
    const [mode, setMode] = useState(modes.pomo);
    const [seconds, setSeconds] = useState(mode.time);
    const [isActive, setIsActive] = useState(false);
    const [isAlarmActive, setIsAlarmActive] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [counter, setCounter] = useState(0);


    //Sounds
    const [play, { stop }] = useSound(
        alarmFx,
        { volume: 0.75 }
    );

    const toggleTimer = () => {
        setIsActive(!isActive);
    }

    const reset = (mode) => {
        setIsActive(false);
        setSeconds(mode.time);
    };

    const pause = () => setIsActive(false);


    const timerEnd = () => {
        play();
        pause();
        console.log(mode)

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
    const toggleAlarm = () => setIsAlarmActive(!isAlarmActive)

    const changeMode = (newMode) => {
        setMode(newMode);
        reset(newMode);
    }

    const alarmClick = () => {
        toggleAlarm();
        isAlarmActive ? stop() : play();
        console.log('ALARM');
    }

    useEffect(() => {
    }, [activeTask])

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds - 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }

        if (seconds === 0 && isActive) {
            timerEnd();

        }
        return () => clearInterval(interval);


    }, [isActive, seconds]);

    const toggleModal = () => {
        stop();
        setIsModalOpen(!isModalOpen);
        toggleTimer();
    }

    const TimerModal = () => {
        return (
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                </ModalHeader>
                <ModalBody className="d-block-inline text-center" >
                    <h2> Take a break! </h2>
                    {activeTask && <h2> {activeTask.name} {activeTask.pomoCount}/{activeTask.pomoCountEst}</h2>}
                </ModalBody>
            </Modal>
        )

    }

    const TomatoBar = () => {
        const tomatoArray = [...Array(counter).keys()];

        return (
            <Col>
                {tomatoArray.map((tomato) => {
                    return (
                        <img className="m-1 tomato" src={Tomato} ></img>
                    )
                })}

            </Col>

        )
    }


    return (
        <Container>
            <Row className="justify-content-center ">
                <Col sm="10">
                    <Card color="transparent">
                        <TimerModal />
                        <CardHeader className="text-center">

                            <Button size="md" className="mx-1" color="transparent" active={mode.name === modes.pomo.name} onClick={() => changeMode(modes.pomo)}>
                                Pomodoro
                            </Button>
                            <Button size="md" className="mx-1" color="transparent" active={mode.name === modes.sBreak.name} onClick={() => changeMode(modes.sBreak)}>
                                Short Break
                            </Button>

                            <Button size="md" className="mx-1" color=" transparent" active={mode.name === modes.lBreak.name} onClick={() => changeMode(modes.lBreak)}>
                                Long Break
                            </Button>

                        </CardHeader>
                        <CardBody className="text-center text-wrap">


                            <h1 className="display-1" >{convertSeconds(seconds)} </h1>

                            <TomatoBar />
                            {activeTask && <p>{activeTask.name} {activeTask.pomoCount}/{activeTask.pomoCountEst}</p>}
                            <Container>
                                <Row className="justify-content-start">
                                    <Col sm="5" className="p-0">
                                        <div className="d-flex justify-content-end">

                                            <Button size='lg' color="danger" className=" d-inline m-1" onClick={() => reset(mode)}>
                                                <FontAwesomeIcon icon={faArrowRotateRight} onClick={toggleTimer} />
                                            </Button>
                                        </div>
                                    </Col>

                                    <Col >
                                    <div className="d-flex justify-content-start">

                                        <Button size='md' color="success" className=" d-inline m-1 " onClick={toggleTimer}>
                                            {isActive ? <FontAwesomeIcon className=" play-btn p-0" icon={faPauseCircle} onClick={toggleTimer} /> : <FontAwesomeIcon className="play-btn m-0 p-0" icon={faPlayCircle} />}
                                        </Button>
                                    </div>
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