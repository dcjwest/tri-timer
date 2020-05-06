import React from 'react';
import { connect } from 'react-redux';
import './Clock.css';

const Clock = ({ currentTime, showClock }) => {
    // Create hour and minute arrays of [1 -> 12] and [1 -> 60] respectively.
    const hoursArr = [...Array(12).keys()].map(x => ++x);
    const minutesArr = [...Array(60).keys()].map(x => ++x);
    const DEGREE_OFFSET = 90 // Subtract 90 deg from all degree values due to offset in the CSS.
    
    /*  Generate hour elements and position on the clock-face.
        Hours are first centered on the clock-face with CSS and then positioned
        dynamically with JS */
    const hourElements = hoursArr.map((hour, index) => {
        let degToRotate = (hour * 360 / 12) - DEGREE_OFFSET; 
            return (
                <div 
                    className='hour-position' 
                    style={{transform: `rotate(${degToRotate}deg) translateX(${7}em)`}}
                    key={index}>
                    {/* Note: Rotation causes text to rotate as well, therefore rotate child back by same amount */}
                    <div 
                        className='hour'
                        style={{transform: `rotate(${-degToRotate}deg)`}}>
                        {hour}
                    </div>
                </div>
            );
        });

        /*  Generate minute elements and position on the clock-face.
            Every 5th-minute element receives slightly different styling. */
        const minuteElements = minutesArr.map((min, index) => {
            let degToRotate = (min * 360 / 60) - DEGREE_OFFSET;
            let emsToTranslate = min % 5 === 0? 7.9 : 8.2;

            return (
                <div 
                    className='minute-position'
                    style={{transform: `rotate(${degToRotate}deg) translateX(${emsToTranslate}em)`}}
                    key={index}>
                </div>
            );
        });

        /*  Compute the rotation of each clock hand as each second ticks by.
            Additional "transition degrees" for minute/hour hands to make them slowly transition to next
            minute/hour, instead of abruptly. */
        const secondsDeg = (currentTime.seconds/60 * 360) - DEGREE_OFFSET;
        const minuteTransitionDeg = currentTime.seconds === 0? 0 : 6/60; // 6deg divided by 60sec since 1 min = 6deg.
        const minutesDeg = (currentTime.minutes/60 * 360) + minuteTransitionDeg*currentTime.seconds - DEGREE_OFFSET;
        const hourTransitionDeg = currentTime.minutes === 0? 0 : 30/3600; // 30deg divided by 3600sec since 1 hr = 30deg.
        const hoursDeg = (currentTime.hours/12 * 360) + hourTransitionDeg*(currentTime.minutes*60+currentTime.seconds) - DEGREE_OFFSET;

    return (
        <div className={`clock-widget container ${showClock? 'fade-in-widget':''}`}>
            <div className='clock'>
                <div className='clock-face'>
                    <div className="hand hour-hand" style={{transform: `rotate(${hoursDeg}deg) translateY(${-50}%)`}}></div>
                    <div className="hand min-hand" style={{transform: `rotate(${minutesDeg}deg) translateY(${-50}%)`}}></div>
                    <div className="hand sec-hand" style={{transform: `rotate(${secondsDeg}deg) translate(${-7}%,${-50}%)`}}></div>
                    <div>{hourElements}</div>
                    <div>{minuteElements}</div>
                </div>
            </div>
            <p className='date-info'>{currentTime.date}</p>
        </div>
    );
}

const mapStateToProps = state => {
    return { currentTime: state.clock.currentTime }
  }

export default connect(mapStateToProps)(Clock);
