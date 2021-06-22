import React from 'react'
import {useLocation} from "react-router";
import axios from 'axios'
import { SERVER } from '../../Config';
import {  useHistory } from "react-router-dom";
import back from './icon/back_icon.png'
import backspace from './icon/backspace_border.png'
import "./InputTempPage.css";
// import { SERVER } from '../../Config';


const InputTempPage = () => {

    const keys = ["1","2","3","4","5","6","7","8","9",".","0","완료"];
    const location = useLocation();
    // const student = location.state.student;
    const student ="1101 김미림"
    const history = useHistory();

  
    const onKeyClick = (key) =>{
        let tempId = document.getElementById('temp_input_text')
        let temp =  tempId.innerHTML
        let hakbun = student.substr(0, 4)

        
        if(key=="완료"){
            
            axios.post(`${SERVER}updating/`,{
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
       
        
        if(tempId.innerHTML==="체온을 입력해주세요"){
            tempId.innerHTML=key
        }else{
            tempId.innerHTML+=key
        }
    }

    const onBackspaceClick = () =>{
        let temp = document.getElementById('temp_input_text')
        temp.innerHTML = temp.innerHTML.slice(0,-1)
    }
    
    return (
    <div className='main_container'>
        <img src={back} className="back_icon1" onClick={()=>{history.goBack();}}/>
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