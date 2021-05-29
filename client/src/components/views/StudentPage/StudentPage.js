import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import "./studentpage.scss";
import back from './icon/back_icon.png'

const StudentPage = () => {

  const [student, setStudent] = useState("")
  const history = useHistory();
  const handleScan = (result)=>{
    const endpoint = `http://localhost:1000/inputtemp/${result}`;
            axios.get(endpoint)
            .then((res)=>{
              setStudent(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    
    history.push({
      pathname: "/InputTemp",
      state: {student: student}
    })

  }

  const handleError = (err)=>{
    console.log(err)
  }

 
  return (
      <div className="main_container">
        <img src={back} className="back_icon" onClick={()=>{ history.goBack();}}/>
        <div className="text_top">학생증 바코드를 찍어주세요</div>
        <div className="barcode_scanner">
          <BarcodeScannerComponent
            onUpdate={(err, result) => {
              if (result) handleScan(result)
              else handleError(err)
            }}
          />
        </div>
        <div className="text_bottom">정중앙에 자세히 찍어주시길 바랍니다.</div>

      </div>
      
  )

}

export default StudentPage;
