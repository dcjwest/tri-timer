import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const initialState = {
    clock: {
        currentTime: {
            hours: 0,
            minutes: 0,
            seconds: 0,
            date: ''
        }
    },
    pomodoro: {
        taskName: '',
        currentTimer: 'work',
        workDuration: 25,
        breakDuration: 5,
        timeLeft: 1500,
        numOfPomodoros: 4,
        pomodorosComplete: 0
    },
    stopwatch: {
        currentElapsedTime: 0,
        totalElapsedTime: 0,
        laps: []
    }
};

const middleWare = [thunk];
const store = createStore(rootReducer, initialState, applyMiddleware(...middleWare));

export default store;