import {createSlice} from "@reduxjs/toolkit";

interface GameSliceState {
    gameStatus: "START" | "PLAYING" | "PAUSED" | "GAME_OVER";
    birdStatus: "JUMPING" | "FALLING" | "GLIDING" | "DEAD";
    gameSpeed: number;
    score: number;
    highScore: number;
    birdPosition: number; // percentage
    easterEggFound: boolean;
}

const initialState: GameSliceState = {
    gameStatus: "START",
    birdStatus: "GLIDING",
    gameSpeed: 0.06,
    score: 0,
    highScore: 0,
    birdPosition: 50,
    easterEggFound: false,
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        easterEggFound: (state) => {
            return {
                ...state,
                easterEggFound: true,
            }
        },
        startGame: (state) => {
            return {
                ...state,
                gameStatus: "PLAYING",
            }
        },
        pauseGame: (state) => {
            return {
                ...state,
                gameStatus: "PAUSED",
            }
        },
        resumeGame: (state) => {
            return {
                ...state,
                gameStatus: "PLAYING",
            }
        },
        gameOver: (state) => {
            return {
                ...state,
                birdStatus: "DEAD",
                gameStatus: "GAME_OVER",
            }
        },
        resetGame: (state) => {
            return {
                ...state,
                gameStatus: "START",
                birdStatus: "GLIDING",
                score: 0,
                birdPosition: 50,
            }
        },
        incrementScore: (state) => {
            return {
                ...state,
                score: state.score + 1,
                highScore: Math.max(state.score + 1, state.highScore),
            }
        },
        resetScore: (state) => {
            return {
                ...state,
                score: 0,
            }
        },
        jump: (state) => {
            if(state.birdStatus === "DEAD") return state;
            if (state.birdPosition >= 100 || state.birdPosition <= 0) {
                return {
                    ...state,
                    birdStatus: "DEAD",
                    gameStatus: "GAME_OVER",
                }
            }
            return {
                ...state,
                gameStatus: "PLAYING",
                birdStatus: "JUMPING",
                birdPosition: state.birdPosition - 10,
            }
        },
        fall: (state) => {
            if(state.birdStatus === "DEAD") return state;
            if (state.birdPosition >= 100 || state.birdPosition <= 0) {
                return {
                    ...state,
                    birdStatus: "DEAD",
                    gameStatus: "GAME_OVER",
                }
            }
            return {
                ...state,
                birdStatus: state.birdPosition > 50 ? "FALLING" : "GLIDING",
                birdPosition: state.birdPosition + 1,
            }
        }
    }
})

export const {
    easterEggFound,
    startGame,
    pauseGame,
    resumeGame,
    gameOver,
    resetGame,
    incrementScore,
    resetScore,
    jump,
    fall,
} = gameSlice.actions;

export default gameSlice.reducer;