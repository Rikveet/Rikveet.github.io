import styles from '@styles/home.module.scss';
import {PageBackground} from "@components/HomePage/PageBackground";
import {LightSwitch} from '@components/HomePage/LightSwitch';
import {MainMenu} from "@components/HomePage/MainMenu";
import {RouteDisplay} from "@components/RouteDisplay";
import {useSnackbar} from "notistack";
import {useAppSelector} from "@/redux/store";
import {selectSnackBar} from "@/redux/selector";
import {useEffect} from "react";

export function Home() {
    const {enqueueSnackbar} = useSnackbar();
    const {severity, message, timestamp} = useAppSelector(selectSnackBar);

    useEffect(() => {
        if(message === '') return;
        enqueueSnackbar(message, {
            variant: severity,
            autoHideDuration: 3000,
        });
    }, [timestamp]);

    return (
        <div className={styles.Container}>
            <PageBackground/>
            <LightSwitch/>
            <MainMenu/>
            <RouteDisplay/>
        </div>
    );
}
