import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type SeverityLevels = "success" | "info" | "warning" | "error";

interface SnackBarSliceState {
    message: string,
    severity: SeverityLevels,
    timestamp: number,
}

const initialState: SnackBarSliceState = {
    message: "",
    severity: "info",
    timestamp: Date.now(),
};

export const snackBarSlice = createSlice({
    name: "snackBar",
    initialState,
    reducers: {
        setSnackBar: (_, action: PayloadAction<{message: string, severity: SeverityLevels}>) => {
            return {...action.payload, timestamp: Date.now()};
        },
        resetSnackBar: (_) => {
            return initialState;
        }
    }
});

export const {setSnackBar, resetSnackBar} = snackBarSlice.actions;

export default snackBarSlice.reducer;

