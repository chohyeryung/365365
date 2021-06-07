import React, { useEffect } from 'react'
import {useLocation} from "react-router";
import axios from 'axios'
import {  useHistory } from "react-router-dom";
import back from './icon/back_icon.png'
import backspace from './icon/backspace_border.png'
import "./InputTempPage.scss";


const InputTempPage = () => {


    const keys = ["1","2","3","4","5","6","7","8","9",".","0","완료"];
    const location = useLocation();
    const student = location.state.student;
    // const student ="3410 오지민"
    const history = useHistory();

  
    const onKeyClick = (key) =>{
        let temp = document.getElementById('temp_input_text')
        
        if(key=="완료"){

            axios.post('http://localhost:1000/api/updating',{
                temperture : temp.innerHTML,
                hakbun :student.substr(0, 4)
            })
            .then((res)=>{
                console.log(res)
                
            })
            .catch((err)=>{
                alert(err)
            })


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

    const onBackspaceClick = () =>{
        let temp = document.getElementById('temp_input_text')
        temp.innerHTML = temp.innerHTML.slice(0,-1)
    }
    
    return (
    <div className='main_container'>
        <img src={back} className="back_icon" onClick={()=>{history.goBack();}}/>
        <div className="outline_input">
            <div className="temp_text">
                체온 입력
            </div>
            <div className="student">
                {student} 
            </div>
            <div className="temp_input">
                <div id ="temp_input_text">체온을 입력해주세요</div>
                <img src={backspace} className="backspace_icon" onClick={onBackspaceClick}/>
            </div>
            
            <div className="keypad">
                {keys.map((key) =>{
                   return <div onClick= {() => onKeyClick(key)} className="key">{key}</div>
                })}
            </div>
        </div>
    </div>

    )

}

export default InputTempPage;
