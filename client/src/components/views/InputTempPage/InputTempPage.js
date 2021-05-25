import React, { useEffect } from 'react'
import {useLocation} from "react-router";
import "./InputTempPage.scss";


const InputTempPage = () => {


    const keys = ["1","2","3","4","5","6","7","8","9",".","0","취소"];
    const location = useLocation();
    // const student = location.state.student;
    const student ="3410 오지민"

    function onkeyclick(key) {
        alert(key);

    }
   
    
   
    
    return (
    <div className='main_container'>
        <div className="outline_input">
            <div className="temp_text">
                체온 입력
            </div>
            <div className="student">
                {student} 
            </div>
            {/* <form onSubmit={handleSubmit}> */}
                <input type="text" className="input_temp" placeholder="체온을 입력해주세요" name="temp"/>                 
            {/* </form> */}

            <div className="keypad">
                {keys.map((key) =>{
                   return <div onClick= {() => onkeyclick(key)} className="key">{key}</div>
                })}
            </div>
        </div>
    </div>

    )

}

export default InputTempPage;
