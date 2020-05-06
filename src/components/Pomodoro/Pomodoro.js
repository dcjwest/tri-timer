import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addTask, updateTimer, switchTimer, resetTimer, finishedPomodoro } from '../../redux/actions/pomodoroActions';
import Alarm from './Alarm';
import Controls from './Controls';
import Meter from './Meter';
import ProgressBar from './ProgressBar';
import Task from './Task';
import './Pomodoro.css';

let intervalTimer;

const Pomodoro = (props) => {
    const {
        showPomodoro,
        addTask,
        updateTimer,
        switchTimer,
        resetTimer,
        finishedPomodoro,
        taskName,
        currentTimer,
        timeLeft,
        workDuration,
        breakDuration,
        numOfPomodoros,
        pomodorosComplete
    } = props;

    const [showTaskPage, setShowTaskPage] = useState(false);
    const [timerRunning, setTimerRunning] = useState(false);

    function startStop() {
        // Pause Timer
        if (timerRunning) {
            setTimerRunning(false);
            clearInterval(intervalTimer);
        }
        // Start Timer
        else {
            setTimerRunning(true);
            let totalTime = timeLeft;
            let timerName = currentTimer;
            intervalTimer = setInterval(() => {
                // Until total time left is 0, update timer by subtracting 1 second.
                if (totalTime > 0) {
                    totalTime--;
                    updateTimer();
                    setProgress(timerName, totalTime);
                }
                else {
                    // Mark pomodoro as complete if work-timer has run through.
                    if (currentTimer === 'work') finishedPomodoro();
                    clearInterval(intervalTimer);
                    setTimerRunning(false);
                    playAlarm();
                    getNextTimer();
                }
            }, 1000);
        }
    }

    function getNextTimer() {
        let nextTimerName, nextTimerDuration;

        if (currentTimer === 'work') {
            nextTimerName = 'break';
            nextTimerDuration = breakDuration;
        }
        else {
            nextTimerName = 'work';
            nextTimerDuration = workDuration;
        }

        switchTimer({nextTimerName, nextTimerDuration});
        setProgress(nextTimerName, nextTimerDuration*60);
    }

    /* Dynamically alter circle's stroke-offset to indicate timer's progress.
       Inspired by: https://css-tricks.com/building-progress-ring-quickly/*/
    function setProgress(timerName, currentTime) {
        const circle = document.querySelector('.progress-ring-inner');
        const radius = circle.r.baseVal.value;
        const circumference =  2 * Math.PI * radius;
        let timerColor, timerDuration, offset, percent;

        if (timerName === 'work' || timerName === 'newTask') {
            timerColor = '#E40C2B';
            timerDuration = workDuration;
        }
        else {
            timerColor = '#30DD00';
            timerDuration = breakDuration;
        }
        
        /* Draw progress ring with selected timer colour.
           Dasharray sets the shape to be one continuous dash with no gap (i.e. circle).
           Dashoffset specifies where to start the gap. Altering this simulates progress bar. */
        circle.style.stroke = timerColor;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = `${circumference}`;

        /* Determine percentage of total time that has elapsed.
           If user has just updated task, reset to 1 */
        percent = timerName === 'newTask'? 1 : currentTime / (timerDuration * 60);
        offset = circumference - percent * circumference;
        circle.style.strokeDashoffset = offset;
    }

    function reset() {
        clearInterval(intervalTimer);
        setTimerRunning(false);
        resetTimer();
        setProgress('work', workDuration*60);
    }

    function addNewTask(newTaskObj) {
        addTask(newTaskObj);
        setProgress('newTask', newTaskObj.workDuration);
    }

    function closeTaskPage() {
        const taskPage = document.querySelector('.task-page');
        taskPage.classList.remove('show');
        setTimeout(() => setShowTaskPage(false), 500);
    }
    
    function formatTime() {
        const min = Math.floor(timeLeft/60);
        const sec = Math.floor(timeLeft - min * 60);

        return `${min < 10? '0'+min : min}:${sec < 10? '0'+sec : sec}`;
    }

    function getCurrentTask() {
        let todo = taskName;

        if (taskName === '') {
            todo = 'Work'; 
        }

        return currentTimer === 'work'? todo : 'Take a break!';
    }

    function playAlarm() {
        const alarm = document.getElementById('alarm');
        alarm.currentTime = 0;
        alarm.play();
    }

    // Cleanup: Clear interval timer and reset all values when component is unmounted.
    useEffect(() => {
        return () => {
            clearInterval(intervalTimer);
            setTimerRunning(false);
            resetTimer();
        }
    }, [resetTimer]);

    return (
        <div className={`pomodoro-widget container ${showPomodoro? 'fade-in-widget': ''}`}>
            {
                showTaskPage && 
                <Task showTaskPage={showTaskPage} addNewTask={addNewTask} closeTaskPage={closeTaskPage} />
            }
            <div className='task-info container'>
                <h2 className='current-task'>{`Todo: ${getCurrentTask()}`}</h2>
                <Meter numOfPomodoros={numOfPomodoros} pomodorosComplete={pomodorosComplete} />
            </div>
            <div className='timer-info container'>
                <ProgressBar 
                    allPomodorosComplete={pomodorosComplete === numOfPomodoros}
                    timeLeft={formatTime()} />
                <p className={`pomodoros-complete-msg ${pomodorosComplete === numOfPomodoros? 'show':''}`}>
                    Congratulations! You've earned a well-deserved break.
                </p>
            </div>
            <Controls 
                openTaskSettings={setShowTaskPage}
                startStop={startStop} 
                reset={reset} 
                timerRunning={timerRunning}
                timeLeft={timeLeft}
                pomodorosComplete={pomodorosComplete}
                numOfPomodoros={numOfPomodoros} />
            <Alarm />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        taskName: state.pomodoro.taskName,
        currentTimer: state.pomodoro.currentTimer,
        workDuration: state.pomodoro.workDuration,
        breakDuration: state.pomodoro.breakDuration,
        timeLeft: state.pomodoro.timeLeft,
        numOfPomodoros: state.pomodoro.numOfPomodoros,
        pomodorosComplete: state.pomodoro.pomodorosComplete
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTask: (newTask) => dispatch(addTask(newTask)),
        updateTimer: () => dispatch(updateTimer()),
        switchTimer: (nextTimer) => dispatch(switchTimer(nextTimer)),
        resetTimer: () => dispatch(resetTimer()),
        finishedPomodoro: () => dispatch(finishedPomodoro()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pomodoro);
