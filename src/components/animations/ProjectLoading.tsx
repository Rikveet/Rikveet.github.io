import projectLoading from "@assets/lottie/project-loading.json";
import {useLottie} from "lottie-react";
import styles from "@styles/lottieAnimation.module.scss";

const options = {
    animationData: projectLoading,
    loop: true
};

export function ProjectLoading() {
    const {View} = useLottie(options);
    return (
        <div className={styles.Container}>
            {
                View
            }
        </div>

    );
}