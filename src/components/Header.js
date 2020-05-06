import React from 'react';

const Header = ({ currentApp, themeColor, appChanged, resetAppChange }) => {
    // Remove animation effects after user clicks on a widget
    setTimeout(() => resetAppChange(false), 450);

    return (
        <header className='container'>
            <div className='container'>
                <div className={`app-logo ${appChanged? 'animate-logo':''}`} style={{borderLeftColor: `${themeColor}`}}></div>
                <h1 className={`app-title ${appChanged? 'fade-in-text':''}`}>{currentApp.replace('-', ' ')}</h1>
            </div>
            <a className='author' href='https://davidcjwest.tk/' target='_blank' rel="noopener noreferrer">
                &copy; 2020 David van der Westhuizen
            </a>
        </header>
    );
}

export default Header;
