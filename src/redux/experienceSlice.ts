import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {getImgFromGRef} from "@utils/getImgFromGRef";

export interface ExperienceSliceState {
    experienceHistory: Experience[],
    volunteerHistory?: Experience[],
    isFetching: boolean
}

const initialState: ExperienceSliceState = {
    experienceHistory: [],
    isFetching: true
}

export const getExperiences = createAsyncThunk(
    "experience/getExperiences",
    async (_, thunkAPI) => {
        try{
            const db = getFirestore();
            const projectsCollection = collection(db, "experience");
            const projectsSnapshot = await getDocs(projectsCollection);
            const experienceHistory: Experience[] = [];
            for (const doc of projectsSnapshot.docs) {
                const experience = doc.data() as Experience;
                experience.date.start = doc.data().date.start.seconds.toString();
                if (doc.data().date.end === undefined)
                    experience.date.end = "Present";
                else
                    experience.date.end = doc.data().date.end.seconds.toString();
                if (doc.data().company.logo !== undefined) {
                    const src = await getImgFromGRef(doc.data().company.logo.src);
                    experience.company.logo = {
                        src,
                        tooltip: doc.data().company.logo.tooltip
                    }
                }
                experienceHistory.push(experience);
            }
            experienceHistory.sort(
                (a, b) => {
                    if (a.date.start === undefined || b.date.start === undefined) return 0;
                    return parseInt(b.date.start) - parseInt(a.date.start);
                }
            )
            return experienceHistory;
        }
        catch (e) {
            return [];
        }

    })

export const experienceSlice = createSlice({
    name: 'experience',
    initialState,
    reducers: {
        setExperience: (state, action: PayloadAction<Experience[]>) => {
            action.payload.sort(
                (a, b) => {
                    if (a.date.start > b.date.start) {
                        return -1
                    } else if (a.date.start < b.date.start) {
                        return 1
                    } else {
                        return 0
                    }
                }
            )
            return {
                ...state,
                experienceHistory: action.payload
            }
        },
        setVolunteerExperience: (state, action: PayloadAction<Experience[]>) => {
            action.payload.sort(
                (a, b) => {
                    if (a.date.start > b.date.start) {
                        return -1
                    } else if (a.date.start < b.date.start) {
                        return 1
                    } else {
                        return 0
                    }
                }
            )
            return {
                ...state,
                volunteerHistory: action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getExperiences.pending, (state) => {
            return {
                ...state,
                isFetching: true
            }
        });
        builder.addCase(getExperiences.fulfilled, (state, action) => {
            return {
                ...state,
                isFetching: false,
                experienceHistory: action.payload
            }
        });
        builder.addCase(getExperiences.rejected, (state) => {
            return {
                ...state,
                isFetching: false
            }
        });
    }
})

export const {
    setExperience,
    setVolunteerExperience,
} = experienceSlice.actions

export default experienceSlice.reducer