import {Button, Link, TextField, Typography} from "@mui/material";
import {Controller, ControllerFieldState, ControllerRenderProps, useForm} from "react-hook-form";
import styles from "@styles/contact.module.scss";
import {useAppDispatch, useAppSelector} from "@/redux/store";
import {selectTheme} from "@/redux/selector";
import {BsDiscord, BsLinkedin} from "react-icons/bs";
import {setSnackBar} from "@/redux/snackBarSlice";
import {useState} from "react";

type ContactMessageType = {
    name: string;
    email: string;
    message: string;
}

function FormTextField<T extends ('name' | 'email' | 'message')>(
    {field, fieldState, label, rows}: {
        field: ControllerRenderProps<ContactMessageType, T>,
        fieldState: ControllerFieldState,
        label: string,
        rows?: number
    }) {
    return (
        <TextField
            {...field}
            label={label}
            variant={'outlined'}
            fullWidth
            required
            sx={{
                scrollbarWidth: '0px',
            }}
            error={fieldState.error?.message !== undefined}
            {...(fieldState.error?.message ? {helperText: fieldState.error?.message} : {})}
            {...(rows !== undefined ? {rows: rows, multiline: true} : {})}
        />
    )
}

export function Contact() {
    const {control, handleSubmit, reset} = useForm<ContactMessageType>({
        defaultValues: {
            name: '',
            email: '',
            message: ''
        },
    })

    const dispatch = useAppDispatch();

    const theme = useAppSelector(selectTheme);

    const [submitting, setSubmitting] = useState(false);

    const postData = async ({name, email, message}: ContactMessageType) => {
        if (submitting) return;

        let url = `https://docs.google.com/forms/d/e/1FAIpQLScAf0iudv4YuoAc58s9_gsXQAN5Vw1iNgjvyZ_7XSTsDXOcEA/formResponse?${process.env.REACT_APP_GOOGLE_FORMS_NAME}=${name}&${process.env.REACT_APP_GOOGLE_FORMS_EMAIL}=${email}&${process.env.REACT_APP_GOOGLE_FORMS_MESSAGE}=${message}`;

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            mode: "no-cors",
        });

        dispatch(setSnackBar({
            message: 'I will get back to you as soon as possible. I have received your message.',
            severity: 'success'
        }))
        reset();
        setSubmitting(false);
    }

    return (
        <div className={styles.Container}>
            <div
                className={styles.ContactForm}
                style={{
                    boxShadow: theme === 'light' ? '0px 0px 10px 0px rgba(0,0,0,0.2)' : '0px 0px 10px 0px rgba(255,255,255,0.2)'
                }}
            >
                <Controller
                    control={control}
                    name={'name'}
                    rules={{
                        required: 'How am I supposed to know who you are if you don\'t tell me?',
                        maxLength: {
                            value: 50,
                            message: 'Your name is too long, try a nickname instead.'
                        },
                        minLength: {
                            value: 2,
                            message: 'Your name is too short.'
                        }
                    }}
                    render={({field, fieldState}) => (
                        <FormTextField {...{field, fieldState, label: "Name"}}/>
                    )}
                />
                <Controller
                    control={control}
                    name={'email'}
                    rules={{
                        required: 'How am I supposed to contact you if you don\'t give me your email?',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'That doesn\'t look like an email to me.'
                        },
                        maxLength: {
                            value: 50,
                            message: 'Your email is too long, try a shorter one.'
                        },
                        minLength: {
                            value: 2,
                            message: 'Your email is too short.'
                        }
                    }}
                    render={({field, fieldState}) => (
                        <FormTextField {...{field, fieldState, label: "Email"}}/>
                    )}
                />
                <Controller
                    control={control}
                    name={'message'}
                    rules={
                        {
                            required: 'You forgot to write a message.',
                            maxLength: {
                                value: 124,
                                message: 'Your message is too long, try a shorter one.'
                            },
                            minLength: {
                                value: 2,
                                message: 'Your message is too short.'
                            }
                        }
                    }
                    render={({field, fieldState}) => (
                        <FormTextField {...{field, fieldState, label: "Message", rows: 4}}/>
                    )}
                />
                <Button
                    className={styles.Button}
                    variant={'contained'}
                    color={'primary'}
                    disabled={submitting}
                    fullWidth
                    onClick={handleSubmit((data) => {
                            postData(data);
                        }
                    )}
                >
                    {submitting ? 'Submitting...' : 'Submit'}
                </Button>
            </div>
            <div className={styles.Divider}>
                <span className={`${styles.DividerLine} ${theme === 'light' ? 'bg-black' : 'bg-white'} `}/>
                <Typography className={`${styles.DividerText} ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
                            variant={'body1'}>
                    OR
                </Typography>
            </div>
            <div className={styles.ContactInfo}>
                <Link href={'https://www.linkedin.com/in/rikveet-hayer/'}>
                    <BsLinkedin className={`text-${theme === 'dark' ? 'white' : 'black'}`} size={'30px'}/>
                </Link>
                <Link href={'https://discord.gg/jQWZcMrAWj'}>
                    <BsDiscord className={`text-${theme === 'dark' ? 'white' : 'black'}`} size={'30px'}/>
                </Link>
            </div>
        </div>
    )
}