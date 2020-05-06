import React from 'react';

const Clockface = ({ minutesDeg, secondsDeg}) => {
    /* Create two sets of arrays for rendering seconds/minutes:
       One for 5-sec/min increments and one for every in between "sub" unit. */
    const secondValuesArr = [...Array(12).keys()].map(x => ++x*5);
    const secondMarkersArr = [...Array(300).keys()].map(x => ++x);
    const minuteValuesArr = [...Array(6).keys()].map(x => ++x*5);
    const minuteMarkersArr = [...Array(90).keys()].map(x => ++x);
    const DEGREE_OFFSET = 90; // Subtract 90 deg from all degree values due to offset in the CSS.

    // Create 12 second values to be shown on the clockface. Range: 5 -> 60 in 5-sec increments.
    const secondValues = secondValuesArr.map((sec, index) => {
        let degToRotate = (++index/12 * 360) - DEGREE_OFFSET;
        return (
            <div 
                className='sw-sec-position'
                key={index}
                style={{transform: `rotate(${degToRotate}deg) translateX(${7}em)`}}>
                <div 
                    className='sw-sec-number'
                    style={{transform: `rotate(${-degToRotate}deg)`}}>
                    {sec}
                </div>
            </div>
        );
    });

    /*  Create 300 second markers: Each marker is a fifth of a second. Every 5th marker represents one second.
        Every 25th marker indicates a displayed second value. */
    const secondMarkers = secondMarkersArr.map((sec, index) => {
        let degToRotate = (sec/300 * 360) - DEGREE_OFFSET;
        let emsToTranslate = sec % 5 === 0?
                             sec % 25 === 0 ? 7.8 : 8
                             : 8.3;
        return (
            <div 
                className='sw-sec-marker'
                key={index}
                style={{transform: `rotate(${degToRotate}deg) translate(${emsToTranslate}em)`}}>
            </div>
        );
    });

    // Create 6 minute values to be shown on the inner clockface. Range: 5 -> 30 in 5-sec increments.
    const minuteValues = minuteValuesArr.map((min, index) => {
        let degToRotate = (++index/6 * 360) - DEGREE_OFFSET;
        return (
            <div
                className='sw-min-position'
                key={index}
                style={{transform: `rotate(${degToRotate}deg) translate(${3}em)`}}>
                <div
                    style={{transform: `rotate(${-degToRotate}deg)`}}>
                    {min}
                </div>
            </div>
        );
    });
    /*  Create 90 minute markers: Each marker is a third of a minute. Every 3rd marker represents one minute.
        Every 15th marker indicates a displayed minute value. */
    const minuteMarkers = minuteMarkersArr.map((min, index) => {
        let degToRotate = (min/90 * 360) - DEGREE_OFFSET;
        let emsToTranslate = min % 3 === 0?
                             min % 15 === 0? 3.8 : 4
                             : 4.3;
        return (
            <div
                className='sw-min-marker'
                key={index}
                style={{transform: `rotate(${degToRotate}deg) translate(${emsToTranslate}em)`}}>
            </div>
        );
    });

    return (
        <div className='sw-sec-face'>{/* Outer Second Clockface */}
            <div 
                className='sw-hand sw-sec-hand'
                style={{transform: `rotate(${secondsDeg}deg) translate(${-7}%, ${-50}%)`}}>
            </div>
            <div
                className='sw-hand sw-min-hand'
                style={{transform: `rotate(${minutesDeg}deg)`}}>
            </div>
            <div>{secondValues}</div>
            <div>{secondMarkers}</div>
            {/* Inner Minute Clockface */}
            <div className='sw-min-face'>
                <div>{minuteValues}</div>
                <div>{minuteMarkers}</div>
            </div>
        </div>
    );
}

export default Clockface;
