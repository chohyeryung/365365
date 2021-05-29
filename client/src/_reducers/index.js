import { combineReducers } from 'redux';
import send from './send_reducer';

const rootReducer = combineReducers({
    send,
})

export default rootReducer;