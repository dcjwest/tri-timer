import React from 'react';
import { IconContext } from 'react-icons';
import { MdPlayArrow, MdPause, MdRefresh, MdNoteAdd } from 'react-icons/md';

const Controls = ({ openTaskSettings, startStop, reset, timerRunning, timeLeft, numOfPomodoros, pomodorosComplete }) => {
    return (
        <div className='controls container'>
            <div className='pt-btn-group container'>
                {/* Restart button. Disabled when elapsed Timer reaches zero. */}
                <button 
                    className={`pt-restart-btn ${timeLeft === 0? 'disabled':''}`} 
                    onClick={reset} >
                    <IconContext.Provider value={{className: 'icon pt-restart-icon'}}>
                        <MdRefresh />
                    </IconContext.Provider>
                </button>
                {/* Start/Pause button. Icon alternates based on whether Timer is running. */}
                <button 
                    className={`pt-start-btn ${pomodorosComplete === numOfPomodoros? 'disabled':''}`} 
                    onClick={startStop}
                    disabled={pomodorosComplete === numOfPomodoros} >
                    <IconContext.Provider value={{className: 'icon pt-start-icon'}}>
                        {!timerRunning && <MdPlayArrow />}
                        {timerRunning && <MdPause/>}
                    </IconContext.Provider>
                </button>
                {/* Add Task button. Functional only when Timer is stopped. */}
                <button 
                    className={`pt-add-btn ${timerRunning? 'disabled':''}`} 
                    onClick={() => openTaskSettings(true)} 
                    disabled={timerRunning} >
                    <IconContext.Provider value={{className: 'icon pt-add-icon'}}>
                        <MdNoteAdd />
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    );
}

export default Controls;
