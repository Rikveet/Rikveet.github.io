import {motion, useMotionValue, useTransform} from "framer-motion";
import {useState} from "react";
import styles from "@styles/lightSwitch.module.scss";
import {useAppDispatch, useAppSelector} from "@reduxStore/store";
import {toggleTheme} from "@reduxStore/themeSlice";
import {LuLampCeiling} from "react-icons/lu";
import {selectTheme} from "@/redux/selector";


export function LightSwitch() {
    // capture the x and y motion values of the wrapping div
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    // use the x value to calculate a new rotation value, clamping it between -5 and 5
    const rotate = useTransform(x, [-400, 400], [-45, 45]);
    // and then rotate the inner div based on that, this requires the rotate value to be inverted
    const rotateInverted = useTransform(rotate, [-45, 45], [45, -45]);

    const dispatch = useAppDispatch();

    // bool to track if theme can be toggled
    // theme can only be toggled if offset is back to 0
    const [canToggle, setCanToggle] = useState<boolean>(true);

    // TODO: const theme = useAppSelector(selectTheme);
    // TODO: use "theme" to switch color of the light switch

    const theme = useAppSelector(selectTheme);

    return (
        <motion.div
            className={styles.container}
            style={{x: x, y: y, rotate: rotateInverted}}
            initial={{y: "-100%"}}
            animate={{y: "0"}}
            transition={{duration: 1, type: 'spring', bounce: 0.5}}
            drag
            dragConstraints={{top: 0, bottom: 0, left: 0, right: 0}}
            dragTransition={{bounceStiffness: 600, bounceDamping: 20}}
            dragElastic={0.1}
            whileTap={{cursor: "grabbing"}}
            onDrag={(_, {offset: {y: yOffset}}) => {
                if (yOffset > 250 && !canToggle) {
                    setCanToggle(true)
                }
            }}
            onDragEnd={() => {
                if (canToggle) {
                    dispatch(toggleTheme());
                    setCanToggle(true)
                }
            }}
        >
            <motion.div className={`${styles.bar}`}
                        animate={theme === 'light' ? {backgroundColor: "rgb(0,0,0)"} : {backgroundColor: "rgb(255,255,255)"}}
                        transition={{duration: '0.3', ease: 'easeIn'}}/>
            <motion.div className={styles.circle}
                        animate={theme === 'light' ? {color: "rgb(0,0,0)"} : {color: "rgb(255,255,255)"}}
                        transition={{duration: '0.3', ease: 'easeIn'}}
            >
                <LuLampCeiling className={styles.icon}/>
            </motion.div>

        </motion.div>
    );
}