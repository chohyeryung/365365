import React, { useEffect } from 'react'
import {useLocation} from "react-router";
import { Link, useHistory } from "react-router-dom";

import "./InputTempPage.scss";


const InputTempPage = () => {


    const keys = ["1","2","3","4","5","6","7","8","9",".","0","완료"];
    // const location = useLocation();
    // const student = location.state.student;
    const student ="3410 오지민"
    const history = useHistory();

  
    function onkeyclick(key) {
        let temp = document.getElementById('temp_input')
        
        if(key=="완료"){

            alert(parseInt(temp.innerHTML));
            alert(parseInt(student.substr(0, 4)));
            history.push({
                pathname: "/student",
              })
        }
        
        if(temp.innerHTML=="체온을 입력해주세요"){
            temp.innerHTML=key
        }else{
            temp.innerHTML+=key
        }


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

            <div id ="temp_input">체온을 입력해주세요</div>
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
