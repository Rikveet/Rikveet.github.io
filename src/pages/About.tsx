import {Typography} from "@mui/material";
import styles from "@styles/about.module.scss";
import {AppBox} from "@utils/AppBox";
import {DisplaySkills} from "@components/DisplaySkills";
import {motion} from "framer-motion";

function TypeWriter({text, className}: {
    text: string,
    className?: string,
}) {
    const textVariant = {
        hidden: {opacity: 0, scale: 0},
        show: {opacity: 1, scale: 1}
    }
    return (
        <div className={`${styles.TypeWriter} ${className !== undefined ? className : ''}`}>
            {
                text.split('').map((char, index) => {
                    return (
                        <motion.div variants={textVariant} key={index} transition={{duration: 0.1}}>
                            <Typography variant={'h6'}>
                                {char}
                                {
                                    char === ' ' ?
                                        <span>&nbsp;</span>
                                        : null
                                }
                            </Typography>
                        </motion.div>
                    )
                })
            }
        </div>
    )
}

const info: {
    title: string,
    content: {
        text?: string,
        caption?: string,
        icons?: Skill[]
    }[]
}[] = [
    {
        title: "Education",
        content: [
            {
                text: "Bachelor of Computer Science (Honours)",
                caption: "Sep 2018 - Sep 2022"
            }, {
                text: "\tMinor in Mathematics",
                caption: "Brock University"
            }, {
                text: " \tConcentration in Artificial Intelligence"
            }]
    },
    {
        title: "Awards and Achievements",
        content: [
            {
                text: "Dean's Honour List",
                caption: "Year 1-4"
            }, {
                text: "GPA: 3.8 / 4.0"
            }, {
                text: "Research Paper",
                caption: "Sep 2022"
            }, {
                caption: "\tMCPSO and DCPSO"
            }, {
                caption: "\tWith Factorized Node and Layer Decomposition"
            },
            {
                caption: "\tFor Large Scale Neural Networks",
            }
        ]
    },
    {
        title: "Extracurricular Activities",
        content: [
            {
                text: "Executive",
                caption: "Feb 2020 - Sep 2022"
            }, {
                caption: "\tWeb developer"
            },
            {
                caption: "\tProgramming Competition Organizer"
            },
            {
                caption: "\tWorkshop Coordinator"
            },
            {
                caption: "\tBrock University Computer Science Club"
            }, {
                text: "Orientation week volunteer",
                caption: "Sep 2019, Jan 2020"
            }, {
                text: "International Collegiate Programming Competition",
                caption: "2021, 2022"
            }]
    },
    {
        title: "IDEs and Tools",
        content: [
            {
                icons: [
                    "IDEA",
                    "VS_CODE",
                    "VISUAL_STUDIO",
                    "GIT",
                    "GITHUB",
                    "GITHUB_ACTIONS",
                    "FIGMA",
                    "PHOTOSHOP",
                    "BLENDER",
                    "AFTER_EFFECTS",
                    "RASPBERRY_PI",
                    "LATEX",
                    "DOCKER"
                ]
            },]
    }
]

export function About() {
    const containerVariants = {
        hidden: {opacity: 0},
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }
    return (
        <AppBox className={styles.Wrapper}>
            <motion.div
                className={styles.Container}
                variants={containerVariants}
                initial={'hidden'}
                animate={'show'}
            >
                {
                    info.map((section, index) => {
                        return (
                            <div className={styles.Section} key={index}>
                                <div className={styles.SectionTitle}>
                                    <TypeWriter text={section.title}/>
                                </div>
                                <motion.div className={styles.SectionContent}
                                            variants={{
                                                hidden: {opacity: 0, y: "-100%", scale: 0},
                                                show: {opacity: 1, y: "0%", scale: 1}
                                            }}
                                            transition={{
                                                duration: 0.5
                                            }}
                                >
                                    {
                                        section.content.map(({text, caption, icons}, _index) => {
                                            return (
                                                <div className={styles.SectionText} key={_index}>
                                                    {
                                                        icons !== undefined ?
                                                            <DisplaySkills skills={icons}/>
                                                            : null
                                                    }
                                                    {
                                                        text !== undefined ?
                                                            <Typography variant={'body2'}>
                                                                {text.replace(/\t/g, '\u00a0\u00a0\u00a0\u00a0')}
                                                            </Typography>
                                                            : null
                                                    }
                                                    {
                                                        caption !== undefined ?
                                                            <Typography variant={'caption'}>
                                                                {caption.replace(/\t/g, '\u00a0\u00a0\u00a0\u00a0')}
                                                            </Typography>
                                                            : null
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </motion.div>
                            </div>
                        )
                    })
                }
            </motion.div>
            {/*<Section>*/}
            {/*    <Title title={"IDEs and Tools"}/>*/}
            {/*    <Content>*/}
            {/*        <Text>*/}
            {/*            <DisplaySkills*/}
            {/*                skills={["IDEA", "VS_CODE", "VISUAL_STUDIO", "GIT", "GITHUB", "GITHUB_ACTIONS", "FIGMA",*/}
            {/*                    "PHOTOSHOP", "BLENDER", "AFTER_EFFECTS", "RASPBERRY_PI", "LATEX", "DOCKER"]}/>*/}
            {/*        </Text>*/}
            {/*    </Content>*/}
            {/*</Section>*/}
        </AppBox>
    )
}