import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface RouteSliceState {
    route: Route,
    title: string,
    initialPositionOnScreen: {
        x: number,
        y: number,
    },
}

const initialState: RouteSliceState = {
    route: "home",
    title: "Home",
    initialPositionOnScreen: {
        x: 0,
        y: 0,
    }
}

export const routeSlice = createSlice({
    name: "route",
    initialState,
    reducers: {
        setRoute: (_, action: PayloadAction<RouteSliceState>) => {
            return action.payload;
        },
        resetRoute: (_) => {
            return initialState;
        }
    }
});


export const {setRoute, resetRoute} = routeSlice.actions;

export default routeSlice.reducer;