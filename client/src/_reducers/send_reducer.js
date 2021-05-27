import {
    SEND_GRADE,
    SEND_MAJOR
} from '../_actions/types';

const initialState = {
    grade: 1,
    major: '뉴미디어소프트웨어',
}

function send(state=initialState, action) {
    switch(action.type) {
        case SEND_MAJOR:
            return {
                ...state,
                major: action.major
            }
        case SEND_GRADE:
            return {
                ...state,
                grade: action.grade
            }
        default:
            return state;
    }
}

export default send;
