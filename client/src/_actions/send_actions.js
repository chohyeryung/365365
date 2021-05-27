import {
    SEND_MAJOR,
    SEND_GRADE
} from './types';

export const saveMajor = (dataToSubmit) => {
    let major = '';
    let obj = {
        '0': '뉴미디어소프트웨어',
        '1': '뉴미디어웹솔루션',
        '2': '뉴미디어디자인'
    }
    dataToSubmit.forEach((d, index) => {
        if(d) major = obj[''+index];
    })

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