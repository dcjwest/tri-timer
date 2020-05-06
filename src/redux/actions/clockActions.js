import { GET_CURRENT_TIME } from './types';

export const getCurrentTime = () => dispatch => {
    const currentTime = new Date();
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentTimeObj = {
        hours: currentTime.getHours(),
        minutes: currentTime.getMinutes(),
        seconds: currentTime.getSeconds(),
        date: `${days[currentTime.getDay()]}, ${currentTime.getDate()} ${months[currentTime.getMonth()]} ${currentTime.getFullYear()}`
    }
    dispatch({
        type: GET_CURRENT_TIME,
        payload: currentTimeObj
    });
}

// TODO: Implement feature to view time in different timezones
// export const getDifferentTimezone = () => dispatch => {
//     fetch("http://worldtimeapi.org/api/timezone/America/Argentina/Salta")
//         .then(res => res.json())
//         .then(timezoneData => dispatch({
//             type: GET_DIFFERENT_TIMEZONE,
//             payload: timezoneData
//         }));
// }
