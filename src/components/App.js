import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getCurrentTime } from '../redux/actions/clockActions';
import './App.css';
import Loader from './Loader/Loader';
import Header from './Header';
import Navbar from './Navbar';
import Clock from './Clock/Clock';
import Pomodoro from './Pomodoro/Pomodoro';
import Stopwatch from './Stopwatch/Stopwatch';

const App = ({ getCurrentTime }) => {
    // State to handle which app is rendered
    const [selectedApp, setSelectedApp] = useState('Clock');
    const [showClock, setShowClock] = useState(true);
    const [showPomodoro, setShowPomodoro] = useState(false);
    const [showStopwatch, setShowStopwatch] = useState(false);
    // State to trigger animation effects
    const [appChanged, setAppChanged] = useState(false);
    const [theme, setTheme] = useState('#0049FF');

    // Get device's current time first, since clock widget is mounted by default.
    setInterval(getCurrentTime, 1000);

    function setApp(name) {
        // Don't do anything if user clicks same widget button multiple times.
        if (selectedApp === name) return;

        const themeColor = window
            .getComputedStyle(document.documentElement)
            .getPropertyValue(`--${name.toLowerCase()}`);

        setSelectedApp(name);
        setTheme(themeColor);
        setAppChanged(true);

        switch (name) {
            case 'Clock':
                setShowClock(true);
                setShowPomodoro(false);
                setShowStopwatch(false);
                break;
            case 'Pomodoro':
                setShowPomodoro(true);
                setShowClock(false);
                setShowStopwatch(false);
                break;
            case 'Stopwatch':
                setShowStopwatch(true);
                setShowClock(false);
                setShowPomodoro(false);
                break;
            default:
                break;
        }
    }

    return (
        <div className="App">
            <Loader />
            <Header
                currentApp={selectedApp}
                themeColor={theme}
                appChanged={appChanged}
                resetAppChange={setAppChanged}
            />
            <div className="widget container">
                {showClock && <Clock showClock={showClock} />}
                {showPomodoro && <Pomodoro showPomodoro={showPomodoro} />}
                {showStopwatch && <Stopwatch showStopwatch={showStopwatch} />}
            </div>
            <Navbar setApp={setApp} />
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        getCurrentTime: () => dispatch(getCurrentTime()),
    };
};

export default connect(null, mapDispatchToProps)(App);
