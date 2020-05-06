import { combineReducers } from 'redux';
import clockReducer from './clockReducer';
import pomodoroReducer from './pomodoroReducer';
import stopwatchReducer from './stopwatchReducer';

export default combineReducers({
    clock: clockReducer,
    pomodoro: pomodoroReducer,
    stopwatch: stopwatchReducer
});
