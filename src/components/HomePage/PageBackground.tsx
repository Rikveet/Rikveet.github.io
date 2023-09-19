import {useAppSelector} from "@/redux/store";
import {selectTheme} from "@/redux/selector";
import {AnimatePresence, motion} from "framer-motion";
import styles from "@styles/homePageBackground.module.scss";
import NightBackground from '@assets/images/background_night.jpg';
import DayBackground from '@assets/images/background_day.jpg';

const ImageAnimationVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5,
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
        }
    }
}

export function PageBackground() {
    const theme = useAppSelector(selectTheme);
    return (
        <div className={styles.BackgroundWrapper}>
            <AnimatePresence mode={'sync'}>
                {
                    theme === 'dark' ?
                        <motion.img
                            key={'dark'}
                            variants={ImageAnimationVariants}
                            initial={'initial'}
                            animate={'animate'}
                            exit={'exit'}
                            className={`${styles.BackgroundImage}`}
                            src={NightBackground}
                            alt={'Mountain valley night'}
                        />
                        :
                        <motion.img
                            key={'light'}
                            variants={ImageAnimationVariants}
                            initial={'initial'}
                            animate={'animate'}
                            exit={'exit'}
                            className={`${styles.BackgroundImage}`}
                            src={DayBackground}
                            alt={'Mountain valley day'}
                        />
                }
            </AnimatePresence>
        </div>
    );
}