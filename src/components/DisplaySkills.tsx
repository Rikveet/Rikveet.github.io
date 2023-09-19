import styles from "@styles/skills.module.scss";
import {getIcon} from "@utils/getIcon";
import {Tooltip, Typography} from "@mui/material";
import {AppBox} from "@utils/AppBox";
import {selectTheme} from "@/redux/selector";
import {useAppSelector} from "@/redux/store";

export function DisplaySkills({skills, maxSize}: { skills: Skill[], maxSize?: string }) {
    const theme = useAppSelector(selectTheme)
    return (<AppBox className={styles.SkillsWrapper} style={maxSize !== undefined ? {width: maxSize} : {}}>
        <div
            className={styles.Skills}
            style={maxSize !== undefined ? {height: maxSize} : {}}
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
        >
            {
                skills.map((skill, index) => {
                        const image = getIcon(skill, theme);
                        if (image.icon) {
                            return (
                                <Tooltip
                                    key={index}
                                    title={image.tooltip}
                                    arrow
                                    leaveDelay={100}
                                >
                                    <img
                                        className={styles.Skill}
                                        src={image.icon}
                                        alt={skill}
                                    />
                                </Tooltip>
                            )
                        } else {
                            return <Typography
                                className={styles.Text}
                                key={index}
                                sx={{
                                    color: theme === 'light' ? 'rgb(0,0,0)' : 'rgb(255,255,255)',
                                    backgroundColor: theme === 'light' ? 'rgb(255,255,255)' : 'rgb(0,0,0)'
                                }}>
                                {image.tooltip}
                            </Typography>
                        }
                    }
                )
            }
        </div>
    </AppBox>)
}