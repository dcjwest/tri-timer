import { GET_CURRENT_TIME } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case GET_CURRENT_TIME:
            return {
                ...state, 
                currentTime: action.payload
            }
        default:
            return state;
    }
}
