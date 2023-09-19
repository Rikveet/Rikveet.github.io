// Theme Slice Selector
export const selectTheme = (state: RootState) => state.theme.type;


// Project Slice Selector
export const selectProjects = (state: RootState) => state.projects.projects;
export const selectProjectFetching = (state: RootState) => state.projects.isFetching;

// Project Slice Selector with Parameters
export const selectProjectBySkills =
    (skills: Skill[]) =>
        (state: RootState) => state.projects.projects.filter(
            (project: Project) => skills.every((skill: Skill) => project.skills.includes(skill)));


// Route Slice Selector
export const selectRoute = (state: RootState) => state.route.route;
export const selectInitialRoutePositionOnScreen = (state: RootState) => state.route.initialPositionOnScreen;
export const selectRouteTitle = (state: RootState) => state.route.title;

// SnackBar Slice Selector
export const selectSnackBar = (state: RootState) => state.snackBar;

// Game Slice Selector

export const selectGameStatus = (state: RootState) => state.game.gameStatus;
export const selectScore = (state: RootState) => state.game.score;
export const selectHighScore = (state: RootState) => state.game.highScore;
export const selectGameSpeed = (state: RootState) => state.game.gameSpeed;
export const selectBirdPosition = (state: RootState) => state.game.birdPosition;
export const selectBirdStatus = (state: RootState) => state.game.birdStatus;
export const selectEasterEggFound = (state: RootState) => state.game.easterEggFound;


// Experience Slice Selector
export const selectExperience = (state: RootState) => state.experience.experienceHistory;
export const selectVolunteerExperience = (state: RootState) => state.experience.volunteerHistory;
export const selectIsFetchingExperience = (state: RootState) => state.experience.isFetching;


