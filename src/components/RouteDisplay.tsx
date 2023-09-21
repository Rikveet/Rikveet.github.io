import {useAppDispatch, useAppSelector} from "@/redux/store";
import {
    selectInitialRoutePositionOnScreen,
    selectRoute,
    selectRouteTitle
} from "@/redux/selector";
import {useEffect, useState} from "react";
import {Modal, Typography} from "@mui/material";
import {resetRoute} from "@/redux/routeSlice";
import styles from "@styles/routeDisplay.module.scss";
import {AiFillCloseCircle} from "react-icons/ai";
import {motion} from "framer-motion";
import {AppBox} from "@/utils/AppBox";
import {FlappyBird} from "@pages/FlappyBird";
import {Experience} from "@pages/Experience";
import {About} from "@pages/About";
import {Projects} from "@pages/Projects";
import {Contact} from "@pages/Contact";
import {gameOver, resetGame} from "@/redux/gameSlice";

const getRouteComponent = (route: Route) => {
    switch (route) {
        case "flappy-bird":
            return <FlappyBird/>
        case "experience":
            return <Experience/>
        case "projects":
            return <Projects/>
        case "about":
            return <About/>
        case "contact":
            return <Contact/>
    }
}

export function RouteDisplay() {
    const route = useAppSelector(selectRoute);
    const title = useAppSelector(selectRouteTitle);
    const initialRoutePosition = useAppSelector(selectInitialRoutePositionOnScreen);
    const [open, setOpen] = useState(false);
    const [framerExit, setFramerExit] = useState(false);


    const dispatch = useAppDispatch();

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setFramerExit(true);
        setTimeout(() => {
            dispatch(resetRoute());
            if (route === "flappy-bird") {
                dispatch(gameOver());
                dispatch(resetGame());
            }
            setFramerExit(false);
            setOpen(false);
        }, 400);
    };

    useEffect(() => {
        if (route !== "home") {
            handleOpen();
        }
    }, [route, initialRoutePosition]);

    // TODO: Figure out how to make the modal background transition in and out
    // TODO: Write an in jsx switch statement for the route

    return (
        <Modal
            className={styles.Modal}
            open={open}
            onClose={handleClose}
            disableEscapeKeyDown
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <motion.div
                initial={{
                    x: initialRoutePosition.x,
                    y: initialRoutePosition.y,
                    opacity: 0,
                    scale: 0
                }}
                animate={
                    framerExit ? {
                        x: initialRoutePosition.x,
                        y: initialRoutePosition.y,
                        opacity: 0,
                        scale: 0
                    } : {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1
                    }
                }
                transition={{
                    duration: 0.4,
                    ease: "easeIn"
                }}>
                <AppBox className={`${styles.Route}`}>
                    <Typography id="modal-modal-title" sx={{position: "relative", marginLeft: "10px"}} variant="h5">
                        {title}
                        <AiFillCloseCircle className={styles.CloseButton} onClick={handleClose}/>
                    </Typography>
                    {
                        getRouteComponent(route)
                    }
                </AppBox>
            </motion.div>
        </Modal>
    )
}