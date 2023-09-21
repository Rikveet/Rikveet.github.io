import React, {useMemo} from 'react';
import {Home} from "@/pages/Home";
import {useAppSelector} from '@/redux/store';
import {selectTheme} from "@/redux/selector";
import {createTheme, PaletteOptions, ThemeProvider} from "@mui/material/styles";
import {SnackbarProvider} from 'notistack';
import {responsiveFontSizes} from "@mui/material";

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
                fontFamily: "Roboto Slab, sans-serif",
                fontWeightLight: 300,
            },
            components: {
                MuiTypography: {
                    styleOverrides: {
                        root: {
                            color: theme === 'light' ? '#000000' : '#ffffff',
                            fontFamily: "Roboto Slab, sans-serif",
                        },
                        h1: {
                            fontFamily: "Playfair Display, sans-serif",
                        },
                        h2: {
                            fontFamily: "Playfair Display, sans-serif",
                        },
                        h3: {
                            fontFamily: "Playfair Display, sans-serif",
                        },
                        h4: {
                            fontFamily: "Playfair Display, sans-serif",
                        },
                        h5: {
                            fontFamily: "Playfair Display, sans-serif",
                        },
                        h6: {
                            fontFamily: "Playfair Display, sans-serif",
                        }
                    }
                },
                MuiTooltip: {
                    styleOverrides: {
                        tooltip: {
                            backgroundColor: theme === 'light' ? '#ffffff' : '#000000',
                            color: theme === 'light' ? '#000000' : '#ffffff',
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
                            fontFamily: "Playfair Display, sans-serif",
                        }
                    }
                },
                MuiInputLabel: {
                    styleOverrides: {
                        root: {
                            fontFamily: "Playfair Display, sans-serif",
                        }
                    }
                },
                MuiFormHelperText: {
                    styleOverrides: {
                        root: {
                            fontFamily: "Roboto Slab, sans-serif",
                        }
                    }
                }

            }
        }
    ), [theme]);
    const responsiveFontTheme = responsiveFontSizes(themeConfig);
    return (
        <ThemeProvider theme={responsiveFontTheme}>
            <SnackbarProvider maxSnack={5}>
                <Home/>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
