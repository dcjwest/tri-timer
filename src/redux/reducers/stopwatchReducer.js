import { UPDATE_STOPWATCH, PAUSE_STOPWATCH, RESET_STOPWATCH, RECORD_LAP } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case UPDATE_STOPWATCH:
            return {
                ...state,
                currentElapsedTime: action.payload
            };
        case PAUSE_STOPWATCH:
            return {
                ...state,
                currentElapsedTime: 0,
                totalElapsedTime: state.totalElapsedTime + action.payload
            }
        case RESET_STOPWATCH:
            return {
                ...state,
                currentElapsedTime: 0,
                totalElapsedTime: 0,
                laps: []
            };
        case RECORD_LAP:
            return {
                ...state,
                laps: [action.payload, ...state.laps]
            };
        default:
            return state;
    }
}
