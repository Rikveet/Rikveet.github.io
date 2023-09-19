import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {getImgFromGRef} from "@utils/getImgFromGRef";

interface ProjectState {
    isFetching: boolean,
    projects: Project[],
}

const initialState: ProjectState = {
    isFetching: true,
    projects: []
}

export const getProjects = createAsyncThunk(
    "projects/getProjects",
    async (_, thunkAPI) => {
        const db = getFirestore();
        const projectsCollection = collection(db, "project");
        const projectsSnapshot = await getDocs(projectsCollection);
        const projects: Project[] = [];
        for (const doc of projectsSnapshot.docs) {
            const project = doc.data() as Project;
            project.created_at = doc.data().created_at.seconds.toString();
            if (doc.data().highlightImage === undefined || doc.data().highlightImage === '')
                project.highlightImage = {error: "No image found"};
            else
                project.highlightImage = await getImgFromGRef(doc.data().highlightImage);
            if (doc.data().images === undefined || doc.data().images.length === 0 || doc.data().images[0] === '')
                project.images = [{error: "No images found"}];
            else
                project.images = await Promise.all(doc.data().images.map(async (img: string) => await getImgFromGRef(img)));
            projects.push(project);
        }
        projects.sort(
            (a, b) => {
                if (a.created_at === undefined || b.created_at === undefined) return 0;
                return parseInt(b.created_at) - parseInt(a.created_at);
            }
        )
        return projects;
    })

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        addProject: (state, action: PayloadAction<Project>) => {
            return {
                ...state,
                projects: [...state.projects, action.payload]
            }
        },
        addProjects: (state, action: PayloadAction<Project[]>) => {
            return {
                ...state,
                projects: [...state.projects, ...action.payload]
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProjects.pending, (state) => {
            return {
                ...state,
                isFetching: true
            }
        });
        builder.addCase(getProjects.fulfilled, (state, action) => {
            return {
                ...state,
                isFetching: false,
                projects: action.payload
            }
        });
        builder.addCase(getProjects.rejected, (state) => {
            return {
                ...state,
                isFetching: false
            }
        });
    }
});

export const {addProject, addProjects} = projectsSlice.actions;

export default projectsSlice.reducer;


