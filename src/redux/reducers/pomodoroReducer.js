import {
    ADD_TASK,
    UPDATE_TIMER,
    SWITCH_TIMER,
    RESET_TIMER,
    FINISHED_POMODORO,
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                taskName: action.payload.taskName,
                workDuration: action.payload.workDuration,
                breakDuration: action.payload.breakDuration,
                timeLeft: action.payload.workDuration * 60,
                numOfPomodoros: action.payload.numOfPomodoros,
                pomodorosComplete: 0,
            };

        case UPDATE_TIMER:
            return {
                ...state,
                timeLeft: state.timeLeft - 1,
            };

        case RESET_TIMER:
            return {
                ...state,
                currentTimer: 'work',
                timeLeft: state.workDuration * 60,
                pomodorosComplete: 0,
            };

        case SWITCH_TIMER:
            return {
                ...state,
                currentTimer: action.payload.nextTimerName,
                timeLeft: action.payload.nextTimerDuration * 60,
            };

        case FINISHED_POMODORO:
            return {
                ...state,
                pomodorosComplete: state.pomodorosComplete + 1,
            };

        default:
            return state;
    }
}
