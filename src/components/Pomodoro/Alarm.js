import React from 'react';
import alarmUrl from '../../assets/pomodoro_alarm.mp3';

const Alarm = () => {
    return (
        <div>
            <audio id='alarm' src={alarmUrl} ></audio>
        </div>
    );
}

export default Alarm;
