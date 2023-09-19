import Rikveet from "@assets/images/rikveet.jpeg";

import styles from "@styles/mainMenu.module.scss";
import {AnimatePresence, motion} from "framer-motion";
import {Fragment, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/store";
import {setRoute} from "@/redux/routeSlice";
import {Typography} from "@mui/material";
import {selectEasterEggFound, selectTheme} from "@/redux/selector";
import {setSnackBar} from "@/redux/snackBarSlice";
import {AppBox} from "@utils/AppBox";
import {easterEggFound} from "@/redux/gameSlice";
import {useWindowSize} from "usehooks-ts";
import React from "react";

const AnimatedMenuItem = ({text, className}: { text: string, className: string }) => {
    return (
        <>
            {
                text.split('').map(
                    (letter, index) => {
                        return <motion.pre
                            className={className}
                            key={`${text} ${index}`}
                            initial={{
                                y: '-50%',
                                rotateX: 90,
                                opacity: 0
                            }}
                            animate={{
                                y: 0,
                                rotateX: 0,
                                opacity: 1
                            }}
                            exit={{
                                y: '50%',
                                rotateX: -90,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.2,
                                delay: index * 0.05,
                                type: 'spring',
                                stiffness: 100,
                                damping: 10,
                            }}
                        >
                            <Typography variant={"h5"}>{letter}</Typography>
                        </motion.pre>
                    })}
        </>
    )
}

type MainMenuItemType = {
    text: string,
    description: string,
    link?: Route
}

const MainMenuItems: MainMenuItemType[] = [
    {
        text: "Experience",
        description: "What have I learned?",
        link: "experience"
    },
    {
        text: "Projects",
        description: "What have I built?",
        link: "projects"
    },
    {
        text: "About",
        description: "Who am I?",
        link: "about"
    },
    {
        text: "Contact",
        description: "How can you reach me?",
        link: "contact"
    }]

const MainMenuItem = ({text, description, link}: MainMenuItemType) => {
    const [isHovered, setIsHovered] = useState(false)
    const dispatch = useAppDispatch();
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})

    return (
        <motion.div className={styles.MainMenuItem}
                    onMouseMove={(e) => {
                        setMousePosition({
                            x: e.clientX - window.innerWidth / 2,
                            y: e.clientY - window.innerHeight / 2
                        })
                    }}
                    onHoverStart={
                        () => {
                            setIsHovered(true)
                        }
                    }
                    onHoverEnd={
                        () => {
                            setIsHovered(false)
                        }
                    }
                    onClick={
                        () => {
                            if (link) {
                                dispatch(setRoute({
                                    route: link,
                                    title: description,
                                    initialPositionOnScreen: {
                                        x: mousePosition.x,
                                        y: mousePosition.y
                                    }
                                }))
                            }
                        }
                    }

        >
            <AnimatePresence mode={'wait'}>
                {
                    isHovered ?
                        <AnimatedMenuItem
                            key={'description'}
                            className={styles.MainMenuItemDescription}
                            text={description}
                        /> :
                        <AnimatedMenuItem
                            className={styles.MainMenuItemTitle}
                            text={text}
                            key={'title'}/>
                }
            </AnimatePresence>
        </motion.div>
    )
}

export function MainMenu() {
    const theme = useAppSelector(selectTheme);
    const _easterEggFound = useAppSelector(selectEasterEggFound)
    const [clickCount, setClickCount] = useState(0);

    const dispatch = useAppDispatch();

    const increment = () => setClickCount(clickCount < 5 ? clickCount + 1 : 0);

    const {width} = useWindowSize();

    // used for Easter egg of flappy bird, click the image 5 times to play flappy bird
    useEffect(() => {
        if (_easterEggFound) {
            dispatch(
                setSnackBar(
                    {
                        severity: 'success',
                        message: `You found the easter egg! 🥚`
                    }
                )
            )
            dispatch(setRoute({
                route: 'flappy-bird',
                title: 'Flappy Bird',
                initialPositionOnScreen: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                }
            }))
            setClickCount(0)
        } else if (clickCount >= 5) {
            dispatch(
                setSnackBar(
                    {
                        severity: 'success',
                        message: `Fine you win! Here play flappy bird! 🐦. Since you like clicking so much.`
                    }
                )
            )
            dispatch(setRoute({
                route: 'flappy-bird',
                title: 'Flappy Bird',
                initialPositionOnScreen: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                }
            }))
            dispatch(easterEggFound())
        } else if (clickCount >= 4) {
            dispatch(
                setSnackBar(
                    {
                        severity: 'error',
                        message: 'This is getting ridiculous! 🤮'
                    }
                )
            );
        } else if (clickCount >= 3) {
            dispatch(
                setSnackBar(
                    {
                        severity: 'error',
                        message: 'Stop please! 😭'
                    }
                )
            );
        } else if (clickCount >= 2) {
            dispatch(
                setSnackBar(
                    {
                        severity: 'warning',
                        message: 'This is getting woozy! 😖'
                    }
                )
            );
        } else if (clickCount > 0) {
            dispatch(
                setSnackBar(
                    {
                        severity: 'success',
                        message: 'Weeee! 😃'
                    }
                )
            )
        }
    }, [clickCount]);


    return (
        <AppBox className={styles.Container}
                sx={{
                    bgcolor: theme === 'light' ? 'rgba(255,255,255,0.3)' : 'rgba(0, 0, 0, 0.3)',
                }}>
            <div className={styles.MainImageWrapper}>
                <motion.img
                    className={styles.MainImage}
                    src={Rikveet}
                    alt={"Rikveet's image"}
                    onClick={increment}
                    onTap={increment}
                    whileHover={
                        {
                            scale: 1.1
                        }
                    }
                    animate={{
                        rotate: clickCount * 360
                    }}
                    transition={{
                        duration: 1,
                        ease: 'easeInOut'
                    }}
                />
            </div>
            <AppBox className={styles.MainMenuItems} sx={{
                bgcolor: 'transparent'
            }}>
                {MainMenuItems.map((item, index) => {
                    return <Fragment key={index}>
                        <MainMenuItem {...item}/>

                        {
                            index === Math.floor((MainMenuItems.length -1) / 2) &&
                            width > 768 ?
                                <MainMenuItem  description={''} text={""}/> : null
                        }
                    </Fragment>
                })}
            </AppBox>
        </AppBox>
    )
}