import {Typography} from "@mui/material";
import {useAppSelector} from "@/redux/store";
import {selectTheme} from "@/redux/selector";

export function LoadingText(){
    const theme = useAppSelector(selectTheme)
    return (
        <Typography sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            backgroundColor: theme === "dark" ? 'rgba(0,0,0,0.8)' : "rgba(255,255,255,0.8)",
            backdropFilter: 'blur(5px)',
            boxShadow: `0 0 5px 5px rgba(0,0,0,0.3)`,
            color: theme === "dark" ? 'white' : "black",
            borderRadius: '5px',
            padding: '5px',
            fontSize: '16px'
        }}>
            Loading...
        </Typography>
    )
}