import {
    ADD_TASK,
    UPDATE_TIMER,
    SWITCH_TIMER,
    RESET_TIMER,
    FINISHED_POMODORO,
} from './types';

export const addTask = newTask => dispatch => {
    dispatch({
        type: ADD_TASK,
        payload: newTask,
    });
};

export const updateTimer = () => dispatch => {
    dispatch({
        type: UPDATE_TIMER,
    });
};

export const switchTimer = nextTimer => dispatch => {
    dispatch({
        type: SWITCH_TIMER,
        payload: nextTimer,
    });
};

export const resetTimer = () => dispatch => {
    dispatch({
        type: RESET_TIMER,
    });
};

export const finishedPomodoro = () => dispatch => {
    dispatch({
        type: FINISHED_POMODORO,
    });
};
