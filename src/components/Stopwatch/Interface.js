import React from 'react';
import { IconContext } from 'react-icons';
import { MdPlayArrow, MdRefresh, MdPause, MdTimer } from 'react-icons/md';

const Interface = ({ stopwatchRunning, totalTime, createLap, startPause, reset }) => {
    return (
        <div className='interface container'>
            <div className='container sw-btn-group'>
                {/* Restart button. Functional only while Stopwatch is paused & elapsed time is non-zero */}
                <button 
                    className={`sw-restart-btn ${stopwatchRunning || totalTime === 0? 'disabled':''}`}
                    onClick={reset}
                    disabled={stopwatchRunning}>
                    <IconContext.Provider value={{className: 'icon sw-restart-icon'}}>
                        <MdRefresh />
                    </IconContext.Provider>
                </button>
                {/* Start/Pause button. Icon alternates based on whether Stopwatch is running. */}
                <button className='sw-start-btn' onClick={startPause}>
                    <IconContext.Provider value={{className: 'icon sw-start-icon'}}>
                        {!stopwatchRunning && <MdPlayArrow />}
                        {stopwatchRunning && <MdPause />}
                    </IconContext.Provider>
                </button>
                {/* Record Lap button. Functional only while Stopwatch is running. */}
                <button 
                    className={`sw-lap-btn ${stopwatchRunning? '':'disabled'}`}
                    onClick={createLap}
                    disabled={!stopwatchRunning}>
                    <IconContext.Provider value={{className: 'icon sw-lap-icon'}}>
                        <MdTimer />
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    )
}

export default Interface;
