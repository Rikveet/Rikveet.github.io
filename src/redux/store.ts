import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {projectsSlice} from "@reduxStore/projectsSlice";
import {themeSlice} from "@reduxStore/themeSlice";
import {routeSlice} from "@reduxStore/routeSlice";
import {snackBarSlice} from "@/redux/snackBarSlice";
import {gameSlice} from "@/redux/gameSlice";
import {experienceSlice} from "@/redux/experienceSlice";

const store = configureStore({
    reducer: {
        theme: themeSlice.reducer,
        projects: projectsSlice.reducer,
        experience: experienceSlice.reducer,
        route: routeSlice.reducer,
        snackBar: snackBarSlice.reducer,
        game: gameSlice.reducer,
    }
});

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;