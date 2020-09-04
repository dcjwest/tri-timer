import React from 'react';
import alarmUrl from '../../assets/pomodoro_alarm.mp3';

const Alarm = () => {
    return <audio id="alarm" src={alarmUrl}></audio>;
};

export default Alarm;
