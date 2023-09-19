import {AppBox} from "@utils/AppBox";
import styles from "@styles/flappyBird.module.scss";
import BackgroundImg1 from "@assets/images/flappyBird/TownAtDark1.webp";
import BackgroundImg2 from "@assets/images/flappyBird/TownAtDark2.webp";
import BackgroundImg3 from "@assets/images/flappyBird/TownAtDark3.webp";
import BackgroundImg4 from "@assets/images/flappyBird/TownAtDark4.webp";
import BirdFall from "@assets/images/flappyBird/BirdFall.webp";
import BirdFlap from "@assets/images/flappyBird/BirdFlap.webp";
import BirdFloat from "@assets/images/flappyBird/BirdFloat.webp";
import Pipe from "@assets/images/flappyBird/Pipe.webp";
import {AnimatePresence, motion} from "framer-motion";
import {ReactNode, useEffect, useState} from "react";
import {useInterval} from "usehooks-ts";
import {useAppDispatch, useAppSelector} from "@/redux/store";
import {
    selectBirdPosition,
    selectGameSpeed,
    selectGameStatus,
    selectHighScore,
    selectScore,
    selectTheme
} from "@/redux/selector";
import {fall, gameOver, incrementScore, jump, pauseGame, resetGame, startGame} from "@/redux/gameSlice";

function GameBackgroundImageSlider({src, speedS}: { src: string, speedS: number }) {
    const [count, setCount] = useState(0)

    useInterval(
        () => {
            if (count === 3)
                setCount(0)
            else
                setCount(count => count + 1)
        },
        speedS * 1000)

    return (
        <AnimatePresence mode={'sync'}>
            <div className={styles.BackgroundImgWrapper}>
                <motion.img className={styles.BackgroundImg}
                            src={src}
                            alt={'Background Land'}
                            key={`${count} 1`}
                            initial={{x: '-100%'}}
                            animate={{x: '100%'}}

                            transition={{duration: speedS, ease: 'linear'}}
                />
                <motion.img className={styles.BackgroundImg}
                            src={src}
                            alt={'Background Land'}
                            key={`${count} 2`}
                            initial={{x: '-100%'}}
                            animate={{x: '100%'}}
                            transition={{duration: speedS, ease: 'linear'}}
                />
                <motion.img className={styles.BackgroundImg}
                            src={src}
                            alt={'Background Land'}
                            key={`${count} 3`}
                            initial={{x: '-100%'}}
                            animate={{x: '100%'}}
                            transition={{duration: speedS, ease: 'linear'}}
                />
            </div>

        </AnimatePresence>
    )
}

function GameBackground() {
    return (
        <div className={styles.Background}>
            <GameBackgroundImageSlider src={BackgroundImg4} speedS={14}/>
            <GameBackgroundImageSlider src={BackgroundImg3} speedS={12}/>
            <GameBackgroundImageSlider src={BackgroundImg2} speedS={10}/>
            <GameBackgroundImageSlider src={BackgroundImg1} speedS={8}/>
        </div>
    )
}


function GamePipe({validFromTop, id, addAPipe, destroy}: { validFromTop: number, id: string, addAPipe: Function, destroy: Function }) {
    const [pipePosition, setPipePosition] = useState(0)
    const [nextPipeAdded, setNextPipeAdded] = useState(false);
    const gameState = useAppSelector(selectGameStatus);
    const gameSpeed = useAppSelector(selectGameSpeed);

    const birdPosition = useAppSelector(selectBirdPosition);

    const dispatch = useAppDispatch();

    useInterval(
        // gravity
        () => {
            setPipePosition(pipePosition => pipePosition + 1)
            if(pipePosition > 40 && !nextPipeAdded){
                setNextPipeAdded(true)
                addAPipe()
            }
            if (pipePosition > 80) {
                {
                    if (birdPosition < 100 - validFromTop - 12 || birdPosition > 100 - validFromTop + 12) {
                       dispatch(gameOver())
                    }
                }
            }
            if (pipePosition > 95) {
                destroy()
            }
        },
        // Delay in milliseconds or null to stop it
        gameState === 'PLAYING' ? (gameSpeed * 1000) : null,
    )
    return (
        <motion.div className={styles.Pipe}
                    key={id}
                    initial={
                        {
                            right: '0%',
                        }
                    }
                    transition={{
                        duration: gameSpeed,
                        ease: 'linear'
                    }}
                    animate={{
                        right: `${pipePosition}%`,
                        opacity: gameState === 'GAME_OVER' ? 0 : 1
                    }}

        >
            <motion.img className={styles.PipeTop}
                        src={Pipe}
                        alt={'Top Pipe'}
                        initial={{top: "-100%"}}
                        animate={{top: `-${validFromTop + 10}%`}}
                        transition={{
                            duration: gameSpeed,
                            ease: 'linear'
                        }}
            />
            <motion.img className={styles.PipeBottom}
                        src={Pipe}
                        alt={'Bottom Pipe'}
                        initial={{rotate: 180, bottom: "-100%"}}
                        animate={{bottom: `-${100 - validFromTop + 10}%`}}
                        transition={{
                            duration: gameSpeed,
                            ease: 'linear'
                        }}
            />
        </motion.div>
    )
}


function GamePipes() {

    const [pipes, setPipes] = useState<{ id: string, component: ReactNode }[]>([])

    const dispatch = useAppDispatch();

    const removePipe = (id: string) => {
        dispatch(incrementScore())
        setPipes((pipes) => [...pipes.filter(pipe => pipe.id !== id)])
    }

    const addAPipe = () => {
        const _id = Date.now().toString() + pipes.length.toString();
        const _validPos = ((Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 20))) + 50;
        setPipes((pipes) => [
            ...pipes,
            {
                id: _id,
                component: <GamePipe key={_id} id={_id} validFromTop={_validPos} addAPipe={()=>{addAPipe()}} destroy={() => removePipe(_id)}/>
            }
        ])
    }

    const gameState = useAppSelector(selectGameStatus);

    useEffect(() => {
        if (gameState === 'GAME_OVER')
            setPipes([])
        else if (gameState === 'PLAYING' && pipes.length === 0) {
            addAPipe()
        }
    }, [gameState]);

    return (
        <div className={styles.Pipes}>
            <AnimatePresence>
                {pipes.map(pipe => pipe.component)}
            </AnimatePresence>
        </div>
    )
}

function GameEngine() {
    const score = useAppSelector(selectScore)
    const highScore = useAppSelector(selectHighScore)
    const gameState = useAppSelector(selectGameStatus)
    const gameSpeed = useAppSelector(selectGameSpeed);
    const birdPosition = useAppSelector(selectBirdPosition);
    const direction = useAppSelector(state => state.game.birdStatus);

    const dispatch = useAppDispatch();

    const theme = useAppSelector(selectTheme);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (gameState === 'GAME_OVER')
                return
            if (e.key === ' ') {
                e.preventDefault();
                dispatch(jump())
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                if (gameState === 'PAUSED')
                    dispatch(startGame())
                else
                    dispatch(pauseGame())
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    useInterval(
        // gravity
        () => {
            dispatch(fall())
        },
        // Delay in milliseconds or null to stop it
        gameState === 'PLAYING' ? gameSpeed * 1000 : null,
    )


    return (
        <div className={styles.GameEngine}>
            <motion.div
                className={styles.Interactive}
                onClick={() => {
                    dispatch(jump())
                }}
            />
            <motion.img
                className={styles.Bird}
                src={direction === 'JUMPING' ? BirdFlap : direction === 'GLIDING' ? BirdFloat : BirdFall}
                alt={'Bird'}
                animate={{
                    top: `${birdPosition}%`,
                    rotate: direction === 'JUMPING' ? -20 : direction === 'GLIDING' || direction === 'DEAD' ? 0 : 20,
                    opacity: gameState === 'GAME_OVER' ? 0 : 1
                }}
                transition={{
                    duration: gameSpeed,
                    ease: 'linear'
                }}
            />
            <motion.div
                className={styles.Menu}
                animate={{
                    top: gameState !== 'PLAYING' ? '50%' : '5px',
                    left: gameState !== 'PLAYING' ? '50%' : '5px',
                    x: gameState !== 'PLAYING' ? '-50%' : '0%',
                    y: gameState !== 'PLAYING' ? '-50%' : '0%',
                    fontSize: gameState !== 'PLAYING' ? '20px' : '15px',
                    background: gameState !== 'PLAYING' ? theme === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0)',
                    backdropFilter: gameState !== 'PLAYING' ? 'blur(5px)' : 'blur(0px)',
                    zIndex: gameState !== 'PLAYING' ? 10 : 3,
                    color: theme === 'dark' && gameState !== 'PLAYING' ? 'rgb(200,200,200)' : 'rgb(60,60,60)',
                }}
                transition={{
                    duration: 1,
                    ease: 'easeInOut'
                }}
            >
                <motion.div
                    className={`w-[100%] flex justify-center items-center`}
                    animate={
                        {
                            opacity: gameState === 'PAUSED' || gameState === 'GAME_OVER' ? 1 : 0,
                            scale: gameState === 'PAUSED' || gameState === 'GAME_OVER' ? 1 : 0,
                        }
                    }>
                    <div>
                        {gameState === 'PAUSED' ? 'Paused' : gameState === 'GAME_OVER' ? 'Game Over' : ''}
                    </div>

                </motion.div>
                <motion.div className={'flex flex-row w-[100%] justify-between items-center'}>
                    <div>Score:</div>
                    &ensp;
                    <div>{score}</div>
                </motion.div>
                <motion.div className={'flex flex-row w-[100%] justify-between items-center'}>
                    <div>High Score:</div>
                    &ensp;
                    <div>{highScore}</div>
                </motion.div>

                <motion.button
                    className={styles.MenuButton}
                    onClick={() => {
                        if (gameState === 'GAME_OVER')
                            dispatch(resetGame())
                        dispatch(startGame())
                    }}
                    animate={
                        {
                            scale: gameState !== 'PLAYING' ? 1 : 0,
                            opacity: gameState !== 'PLAYING' ? 1 : 0,
                            background: theme === 'dark' ? 'rgba(75,75,75,0.5)' : 'rgba(150,150,150,0.5)',
                        }
                    }
                    whileHover={{scale: 0.95}}
                >
                    {gameState === 'PAUSED' ? 'Resume' : gameState === 'GAME_OVER' ? 'Restart' : 'Start'}
                </motion.button>
            </motion.div>
            <GamePipes/>
        </div>
    )
}

export function FlappyBird() {
    return (
        <AppBox className={styles.Wrapper}>
            <div className={styles.Container}>
                <GameEngine/>
                <GameBackground/>
            </div>
        </AppBox>
    )
}