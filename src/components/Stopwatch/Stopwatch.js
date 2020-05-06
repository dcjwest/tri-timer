import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateStopwatch, pauseStopwatch, resetStopwatch, recordLap } from '../../redux/actions/stopwatchActions';
import Clockface from './Clockface';
import Interface from './Interface';
import './Stopwatch.css';

let startTime = 0,
    millisecElapsed = 0,
    intervalTimer;

const Stopwatch = (props) => {
    const { 
        showStopwatch,
        updateStopwatch,
        pauseStopwatch,
        resetStopwatch,
        recordLap,
        currentElapsedTime,
        totalElapsedTime,
        laps
    } = props;

    const [stopwatchRunning, setStopwatchRunning] = useState(false);
    const totalTime = totalElapsedTime + currentElapsedTime;
    const DEGREE_OFFSET = 90 // Subtract 90 deg from all degree values due to offset in the CSS.
    
    // Convert elapsed time (in milliseconds) to degrees.
    const secondsDeg = (totalTime/1000)/60*360 - DEGREE_OFFSET; // Degrees to rotate second-hand.
    const minutesDeg = (totalTime/60000)/30*360 - DEGREE_OFFSET; // Degrees to rotate minute-hand.

    function startPause() {
        // Pause Stopwatch
        if (stopwatchRunning) {
            setStopwatchRunning(false);
            pauseStopwatch(millisecElapsed);
            clearInterval(intervalTimer);
        }
        // Start Stopwatch
        else {
            setStopwatchRunning(true);
            startTime = new Date().getTime();
            /*  Note: Browsers implement throttling of setInterval function calls for intervals < 4ms.
                To compute elapsed time, calculate difference between time NOW and when Stopwatch started.*/
            intervalTimer = setInterval(() => {
                let now = new Date().getTime();
                millisecElapsed = now - startTime;
                updateStopwatch(millisecElapsed);
            }, 10);
        }
    }

    function reset() {
        // For larger device screens, animate Stopwatch back to center.
        if (document.documentElement.clientWidth >= 768) {
            document.querySelector('.lap-list').style.width = '0%';
            document.querySelector('.stopwatch').style.width = '100%';
        }
        else {
            document.querySelector('.lap-list').style.width = '100%';
            document.querySelector('.stopwatch').style.width = '100%';
        }
        resetStopwatch();
    }

    // Convert total elapsed time in milliseconds to digital format (00:00:00).
    function formatDigitalOutput(totalTimeInMillisec) {
        const min = Math.floor(totalTimeInMillisec/60000);
        const sec = Math.floor((totalTimeInMillisec - min*60000) / 1000);
        const secHundredth = Math.floor((totalTimeInMillisec - min*60000 - sec*1000) / 10);
        const timeValues = { min, sec, secHundredth };
        const timeDigital = [];

        // Prefix time value with a zero if < 10.
        Object.entries(timeValues).forEach(([unit, value]) => {
            let formatted = value < 10? '0' + value : value;
            timeDigital.push(formatted);
        });

        return timeDigital.join(':');
    }

    function createLap() {
        // For larger device screens, animate Stopwatch to make room for lap info.
        if (document.documentElement.clientWidth >= 768) {
            document.querySelector('.lap-list').style.width = '50%';
            document.querySelector('.stopwatch').style.width = '50%';
        }
        else {
            document.querySelector('.lap-list').style.width = '100%';
            document.querySelector('.stopwatch').style.width = '100%';
        }
        
        // Save formatted elapsed lap-time and build new lap object to add to the list.
        const time = formatDigitalOutput(currentElapsedTime);
        const newLap = { id: laps.length + 1, time };
        recordLap(newLap);
    }
    
// Dynamically render a list of recorded laps, indicating lap number and time in each list-item.
    const lapList = laps.map(lap => {
        return (
            <li className='lap container' key={lap.id}>
                <div className='lap-number'>Lap {lap.id}</div>
                <div className='lap-time'>{lap.time}</div>
            </li>
        );
    });

    // Cleanup: Clear interval timer and reset all values when component is unmounted.
    useEffect(() => {
        return () => {
            setStopwatchRunning(false);
            resetStopwatch();
            clearInterval(intervalTimer);
        }
    }, [resetStopwatch]);

    return (
        <div className={`stopwatch-widget container ${showStopwatch? 'fade-in-widget':''}`}>
            <div className='stopwatch'>
                <Clockface secondsDeg={secondsDeg} minutesDeg={minutesDeg} />
                <p className='total-time'>{formatDigitalOutput(totalTime)}</p>
            </div>
            {/* Dynamically display laps as they are recorded */}
            <ul className='lap-list'>{lapList}</ul>
            <Interface 
                createLap={createLap}
                stopwatchRunning={stopwatchRunning} 
                startPause={startPause}
                reset ={reset}
                totalTime={totalTime} />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currentElapsedTime: state.stopwatch.currentElapsedTime,
        totalElapsedTime: state.stopwatch.totalElapsedTime,
        laps: state.stopwatch.laps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateStopwatch: elapsedTime => dispatch(updateStopwatch(elapsedTime)),
        pauseStopwatch: elapsedTime => dispatch(pauseStopwatch(elapsedTime)),
        resetStopwatch: () => dispatch(resetStopwatch()),
        recordLap: newLap => dispatch(recordLap(newLap))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stopwatch);
