import React, { useState } from 'react'
import {useHistory } from "react-router-dom";
import axios from 'axios'
import { SERVER } from '../../Config';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import "./studentpage.css";
import back from './icon/back_icon.png'

const StudentPage = () => {

  const history = useHistory();
  const handleScan = (result)=>{
    // 코드 확인
    const scode = result.text;
    axios.get(`${SERVER}inputtemp/${scode}`)
            .then((res)=>{
              console.log(res.data.info);
              history.push({
                pathname: "/InputTemp",
                state: {stu: res.data.info}
              })
              .catch((err)=>{
                  console.log(err)
              })
            })
            .catch((err)=>{
                console.log(err)
            })

  }

  const handleError = (err)=>{
    console.log(err)
  }

 
  return (
      <div className="main_container">
        <img src={back} className="back_icon" onClick={()=>{  history.push({ pathname: "/",})}} alt=""/>
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
