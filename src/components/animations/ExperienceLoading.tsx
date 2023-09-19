import {useLottie} from "lottie-react";
import experienceLoading from "@assets/lottie/experience-loading.json";
import styles from "@styles/lottieAnimation.module.scss";

const options = {
    animationData: experienceLoading,
    loop: true
};

export function ExperienceLoading() {
    const {View} = useLottie(options);
    return (
        <div className={styles.Container}>
            {
                View
            }
        </div>

    );
}