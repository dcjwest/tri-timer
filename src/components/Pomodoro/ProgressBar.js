import React from 'react';

/* Circular progress bar based off an SVG element with an outer and inner circle element.
   Inner circle's stroke offset is dynamically altered to indicate timer's progress.
   Inspired by: https://css-tricks.com/building-progress-ring-quickly/ */

const ProgressBar = ({ allPomodorosComplete, timeLeft }) => {
    return (
        <div className={`timer container ${allPomodorosComplete? 'fall':''}`}>
            <svg className='progress-ring'>
                <circle
                    className='progress-ring-outer'
                    r={`8.4em`}
                    cx={`9em`}
                    cy={`9em`} />
                <circle
                    className='progress-ring-inner'
                    r={`8.4em`}
                    cx={`9em`}
                    cy={`9em`} />
            </svg>
            <p className='time-left'>{timeLeft}</p>
        </div>
    );
}

export default ProgressBar;
