import React from 'react';
import { IconContext } from 'react-icons';
import { MdAccessTime } from 'react-icons/md';
import './Loader.css';

const Loader = () => {
    return (
        <div className="loader container">
            <div className="loader-bg"></div>
            <div className="loader-logo-wrapper container">
                <div className="loader-triangle-group container">
                    <div className="loader-triangle"></div>
                    <div className="loader-triangle"></div>
                    <div className="loader-triangle"></div>
                </div>
                <div className="loader-circle container"></div>
                <div className="loader-timer container">
                    <IconContext.Provider
                        value={{ className: 'loader-timer-icon' }}
                    >
                        <MdAccessTime />
                    </IconContext.Provider>
                </div>
            </div>
            <div className="loader-text">tri-timer</div>
        </div>
    );
};

export default Loader;
