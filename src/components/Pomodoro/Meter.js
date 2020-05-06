import React from 'react';
import { IconContext } from 'react-icons';
import { GiTomato } from "react-icons/gi";

const Meter = ({ numOfPomodoros, pomodorosComplete }) => {
    const pomodoroMeter = [...new Array(numOfPomodoros)].map((item, index) => {
        item = ++index;
        /* Add styling according to how many pomodoros have been completed.
           Current pomodoro has a pulse effect; completed pomodoros light up. */
        let currentPomodoro = pomodorosComplete + 1;
        let pomodoroClasses = item <= pomodorosComplete? 'pomodoro complete':
                               item === currentPomodoro? 'pomodoro current':'pomodoro';
        return (
            <li className={pomodoroClasses} key={index}>
                <IconContext.Provider value={{className: 'pomodoro-icon'}}><GiTomato /></IconContext.Provider>
            </li>
        );
    });

    return (
        <ul className='pomodoro-meter container'>
            {pomodoroMeter}
        </ul>
    );
}

export default Meter;
