import {
    UPDATE_STOPWATCH,
    PAUSE_STOPWATCH,
    RESET_STOPWATCH,
    RECORD_LAP,
} from './types';

export const updateStopwatch = elapsedTime => dispatch => {
    dispatch({
        type: UPDATE_STOPWATCH,
        payload: elapsedTime,
    });
};

export const pauseStopwatch = elapsedTime => dispatch => {
    dispatch({
        type: PAUSE_STOPWATCH,
        payload: elapsedTime,
    });
};

export const resetStopwatch = () => dispatch => {
    dispatch({
        type: RESET_STOPWATCH,
    });
};

export const recordLap = lapTime => dispatch => {
    dispatch({
        type: RECORD_LAP,
        payload: lapTime,
    });
};
