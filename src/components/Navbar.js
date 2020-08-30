import React from 'react';
import { IconContext } from 'react-icons';
import { MdAccessTime, MdTimer, MdAvTimer } from 'react-icons/md';

const Navbar = ({ setApp }) => {
    const handleClick = e => setApp(e.target.value);

    return (
        <nav className="container">
            <ul className="container">
                <li>
                    <button
                        value="Clock"
                        className="container btn btn-clock"
                        onClick={handleClick}
                    >
                        <IconContext.Provider
                            value={{ className: 'icon icon-clock' }}
                        >
                            <MdAccessTime />
                        </IconContext.Provider>
                        <span>Clock</span>
                    </button>
                </li>
                <li>
                    <button
                        value="Pomodoro"
                        className="container btn btn-pomodoro"
                        onClick={handleClick}
                    >
                        <IconContext.Provider
                            value={{ className: 'icon icon-pomodoro' }}
                        >
                            <MdAvTimer />
                        </IconContext.Provider>
                        <span>Pomodoro</span>
                    </button>
                </li>
                <li>
                    <button
                        value="Stopwatch"
                        className="container btn btn-stopwatch"
                        onClick={handleClick}
                    >
                        <IconContext.Provider
                            value={{ className: 'icon icon-stopwatch' }}
                        >
                            <MdTimer />
                        </IconContext.Provider>
                        <span>Stopwatch</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
