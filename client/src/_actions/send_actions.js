import {
    SEND_MAJOR,
    SEND_GRADE
} from './types';

export const saveMajor = (dataToSubmit) => {
    let major = ''
    for(let i in dataToSubmit) {
        if(dataToSubmit[i]) {
            major = i;
        }
    }

    return {
        type: SEND_MAJOR,
        major: major
    }
}

export const saveGrade = (dataToSubmit) => {
    let grade = 0
    
    dataToSubmit.forEach((d, index) => {
        if(d) grade = index+1
    })

    return {
        type: SEND_GRADE,
        grade: grade
    }
}