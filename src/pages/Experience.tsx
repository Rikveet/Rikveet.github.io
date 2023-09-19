import {AppBox} from "@utils/AppBox";
import styles from "@styles/experience.module.scss";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/store";
import {selectExperience, selectIsFetchingExperience, selectTheme} from "@/redux/selector";
import {Tooltip, Typography} from "@mui/material";
import {useInterval, useWindowSize} from "usehooks-ts";
import {setSnackBar} from "@/redux/snackBarSlice";
import {DisplaySkills} from "@components/DisplaySkills";
import {ExperienceLoading} from "@components/animations/ExperienceLoading";
import {LoadingText} from "@components/LoadingText";
import {getExperiences} from "@/redux/experienceSlice";
import {getDateFromSeconds} from "@utils/getDateFromSeconds";

function ExperienceItem({experience, pointer, prevPointer, isSelected}: {
    experience: Experience,
    pointer: number,
    prevPointer: number,
    isSelected: boolean
}) {
    const theme = useAppSelector(selectTheme);
    return (
        <motion.div
            style={{backgroundColor: theme === 'light' ? 'rgb(255,255,255)' : 'rgb(0,0,0)'}}
            className={styles.Experience}
            initial={{
                y: pointer > prevPointer ? '110%' : '-110%',
                scale: 0.5
            }}
            animate={{
                y: isSelected ? '0%' : pointer >= prevPointer ? '-110%' : '110%',
                scale: isSelected ? 1 : 0.5,
            }}
            exit={{
                y: pointer >= prevPointer ? '-110%' : '110%',
            }}
            transition={{duration: 0.8, ease: 'linear'}}
        >
            <AppBox className={'w-[100%]'}>
                <Typography className={styles.Title} variant={"body1"}>
                    {experience.position}
                    {experience.company.logo?.src?.src !== undefined ?
                        <Tooltip
                            title={experience.company.logo.tooltip}
                            arrow
                        >
                            <img className={'w-[20px] h-[20px] rounded-full'}
                                 src={experience.company.logo.src.src}
                                 alt={experience.company.logo.tooltip}/>
                        </Tooltip>
                        : null}
                </Typography>
                <AppBox className={styles.SubtitleWrapper}>
                    <Typography className={styles.Subtitle} variant={"body2"}>
                        {experience.company.name}
                    </Typography>
                    <Typography className={styles.Subtitle} variant={"body2"}>
                        {experience.company.location}
                    </Typography>
                </AppBox>
                <DisplaySkills skills={experience.skills}/>
            </AppBox>
            <AppBox className={styles.Content}>
                <AppBox
                    className={styles.Description}
                    sx={{
                        boxShadow: theme === 'light' ? '0px 0px 10px 0px rgba(0,0,0,0.1)' : '0px 0px 10px 0px rgba(255,255,255,0.1)'
                    }}
                >
                    <motion.ul
                        variants={
                            {
                                hidden: {
                                    opacity: 0,
                                },
                                visible: {
                                    opacity: 1,
                                }
                            }
                        }
                        initial={'hidden'}
                        animate={'visible'}
                        transition={{
                            duration: 0.5,
                            delayChildren: 0.1,
                        }}
                    >
                        {experience.description.split('\\n').map((line, index) => {
                                return (

                                    <motion.li
                                        onTouchStart={
                                            (event) => {
                                                event.stopPropagation()
                                            }
                                        }
                                        onWheel={
                                            (event) => {
                                                event.stopPropagation()
                                            }
                                        }
                                        variants={
                                            {
                                                hidden: {
                                                    opacity: 0,
                                                },
                                                visible: {
                                                    opacity: 1,
                                                }
                                            }
                                        }
                                        style={{
                                            display: "list-item",
                                            listStyleType: 'circle',
                                            lineHeight: '0',
                                        }} key={index}>
                                        <Typography variant={'caption'}>
                                            {line.trim()}
                                        </Typography>
                                    </motion.li>

                                )
                            }
                        )}
                    </motion.ul>
                </AppBox>

            </AppBox>
        </motion.div>
    )
}

const Timeline = ({date: {start, end}, pointer, prevPointer, isSelected}: {
    date: { start: string, end: string },
    pointer: number,
    prevPointer: number,
    isSelected: boolean
}) => {
    const theme = useAppSelector(selectTheme);
    const {width} = useWindowSize();

    return (
        <motion.div
            className={styles.Timeline}
            initial={{
                y: pointer > prevPointer ? '110%' : '-110%',
            }}
            animate={{
                y: isSelected ? '0%' : pointer >= prevPointer ? '-110%' : '110%',
            }}
            exit={{
                y: pointer >= prevPointer ? '-110%' : '110%',
            }}
            transition={{duration: 0.8, ease: 'linear'}}
        >
            <Typography className={`${styles.Date} ${styles.End}`} variant={"caption"}>
                {end !== 'Present' ? getDateFromSeconds(parseInt(end)) : end}
            </Typography>
            <div className={styles.Bar}
                 style={{backgroundColor: width < 640 ? 'transparent' : theme === 'light' ? 'rgb(0,0,0)' : 'rgb(255,255,255)'}}/>
            <Typography className={`${styles.Date} ${styles.Start}`} variant={"caption"}>
                {getDateFromSeconds(parseInt(start))}
            </Typography>
        </motion.div>
    )
}

export function Experience() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setSnackBar(
            {
                message: 'Scroll/Tap(top or bottom) to navigate',
                severity: 'info',
            }
        ))
    }, []);

    const [pointer, setPointer] = useState(0);
    const [prevPointer, setPrevPointer] = useState(-1);
    const experience = useAppSelector(selectExperience);
    const isFetching = useAppSelector(selectIsFetchingExperience)
    const scrollDirection = useRef<'UP' | 'DOWN'>('DOWN');
    const scrollable = useRef(false);

    useInterval(() => {
        if (!scrollable.current || isFetching)
            return;
        if (scrollDirection.current === 'UP') {
            if (pointer === 0) return;
            setPrevPointer(pointer)
            setPointer(pointer => pointer - 1);
        }
        if (scrollDirection.current === 'DOWN') {
            if (pointer === experience.length - 1) return;
            setPrevPointer(pointer)
            setPointer(pointer => pointer + 1);
        }
        scrollable.current = false;
    }, 800);

    useEffect(() => {
        if (experience.length === 0) {
            dispatch(getExperiences())
        }
    }, []);

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            onTouchStart={
                (event) => {
                    scrollable.current = true;
                    scrollDirection.current = event.touches[0].clientY > window.innerHeight / 2 ? 'DOWN' : 'UP';
                }
            }
            onWheel={
                (event) => {
                    scrollable.current = true;
                    scrollDirection.current = event.deltaY > 0 ? 'DOWN' : 'UP';
                }
            }
            className={styles.Wrapper}>
            <AnimatePresence mode={'wait'}>
                <AppBox className={styles.Container}>
                    {
                        isFetching ?
                            <AppBox className={'w-[100%] h-[100%] flex justify-center items-center relative'}>
                                <ExperienceLoading/>
                                <LoadingText/>
                            </AppBox> :
                            <>
                                <AnimatePresence key={'TIMELINE'} mode={"sync"} initial={false}>
                                    {
                                        experience.map((item, index) => {
                                            return (
                                                index === pointer || index === prevPointer ?
                                                    <Timeline key={`${item.date.start}-${item.date.end}`}
                                                              date={item.date} pointer={pointer}
                                                              prevPointer={prevPointer}
                                                              isSelected={index === pointer}/> :
                                                    null
                                            )
                                        })
                                    }
                                </AnimatePresence>
                                <AnimatePresence key={'EXPERIENCE'} mode={"sync"} initial={false}>
                                    {
                                        experience.map((item, index) => {
                                            return (
                                                index === pointer || index === prevPointer ?
                                                    <ExperienceItem key={`${item.date.start}-${item.date.end}`}
                                                                    experience={item}
                                                                    pointer={pointer} prevPointer={prevPointer}
                                                                    isSelected={index === pointer}/> :
                                                    null
                                            )
                                        })
                                    }
                                </AnimatePresence>
                            </>
                    }

                </AppBox>
            </AnimatePresence>
        </motion.div>
    )
}