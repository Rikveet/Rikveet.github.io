import React, {useMemo} from 'react';
import {Home} from "@/pages/Home";
import {useAppSelector} from '@/redux/store';
import {selectTheme} from "@/redux/selector";
import {createTheme, PaletteOptions, Theme, ThemeOptions, ThemeProvider} from "@mui/material/styles";
import {SnackbarProvider} from 'notistack';

const getPalette = (theme: string): PaletteOptions => {
    const palette: PaletteOptions = theme === 'light' ?
        {
            mode: 'light',
            primary: {
                main: '#000000'
            },
            secondary: {
                main: '#ffffff'
            },
            background: {
                default: '#ffffff'
            },
            text: {
                primary: '#000000'
            }
        } :
        {
            mode: 'dark',
            primary: {
                main: '#ffffff'
            },
            secondary: {
                main: '#000000'
            },
            background: {
                default: '#000000',
            },
            text: {
                primary: '#ffffff'
            }
        }
    return {
        ...palette,
    }
}

function App() {
    const theme = useAppSelector(selectTheme);
    const themeConfig = useMemo(() => createTheme(
        {
            palette: getPalette(theme),
            typography: {
                fontFamily: "Merriweather Sans, sans-serif",
                htmlFontSize: 10,
                fontWeightLight: 300,
            },
            components: {
                MuiTypography: {
                    styleOverrides: {
                        root: {
                            color: theme === 'light' ? '#000000' : '#ffffff',
                        },
                        h5: {
                            fontWeight: '500',
                            fontSize: '0.95rem',
                            fontFamily: "Montserrat, sans-serif",
                            textTransform: 'uppercase',
                        },
                        h6: {
                            fontWeight: '500',
                            fontSize: '0.85rem',
                            fontFamily: "Montserrat, sans-serif",
                            textTransform: 'uppercase'
                        },
                        body1: {
                            fontWeight: 'lighter',
                            fontSize: '0.75rem',
                        },
                        body2: {
                            fontWeight: 'lighter',
                            fontSize: '0.6rem',
                        },
                        caption: {
                            fontWeight: 'lighter',
                            fontSize: '0.55rem',
                        }
                    }
                },
                MuiTooltip: {
                    styleOverrides: {
                        tooltip: {
                            backgroundColor: theme === 'light' ? '#ffffff' : '#000000',
                            color: theme === 'light' ? '#000000' : '#ffffff',
                            fontSize: '8px',
                            borderRadius: '4px',
                            padding: '4px',
                            boxShadow: `0 0 4px 0 ${theme === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'}}`,
                            cursor: 'pointer',
                        },
                        arrow: {
                            color: theme === 'light' ? '#ffffff' : '#000000',
                        },
                        tooltipPlacementBottom: {
                            "&.MuiTooltip-tooltipArrow": {
                                marginTop: "4px !important",
                            },
                            marginTop: "4px !important",
                        },

                    }
                },
                MuiInputBase: {
                    styleOverrides: {
                        root: {
                            fontFamily: "Merriweather Sans, sans-serif",
                            fontSize: "10px",
                            "*":{
                                "&::-webkit-scrollbar": {
                                    width: "0px"
                                }
                            },
                        }
                    }
                },
                MuiInputLabel: {
                    styleOverrides: {
                        root: {
                            fontFamily: "Merriweather Sans, sans-serif",
                            fontSize: "12px",
                        }
                    }
                },
                MuiFormHelperText: {
                    styleOverrides: {
                        root: {
                            fontFamily: "Merriweather Sans, sans-serif",
                            fontSize: "8px",
                        }
                    }
                }

            }
        }
    ), [theme]);
    return (
        <ThemeProvider theme={themeConfig}>
            <SnackbarProvider maxSnack={5}>
                <Home/>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
