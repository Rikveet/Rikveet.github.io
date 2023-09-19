import Box, {BoxProps} from "@mui/material/Box";
import {CSSProperties, ReactNode} from "react";

export function AppBox(props: BoxProps) {
    // custom box component for the app that complies with the theme
    const children: ReactNode = props.children !== undefined ? props.children : null;
    if (children === null)
        throw new Error("AppBox must have children");
    return (
        <Box {...(
            {
                ...(props) as BoxProps,
                sx: {
                    bgcolor: 'background.default',
                    color: 'text.primary',
                    ...props.sx,
                }
            }
        )}>
            {children}
        </Box>
    )
}