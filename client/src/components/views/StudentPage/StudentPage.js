import React, { useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import "./studentpage.scss";


const StudentPage = () => {

  const history = useHistory();
  const handleScan = (result)=>{

    // 코드 확인

    
    history.push({
      pathname: "/InputTemp",
      state: {student: "3410오지민"}
    })

  }

  const handleError = (err)=>{
    console.log(err)
  }

  return (
      <div className="main_container">
        <div className="text_top">학생증 바코드를 찍어주세요</div>
        <div className="barcode_scanner">
          <BarcodeScannerComponent
            onUpdate={(err, result) => {
              if (result) handleScan(result)
              else handleError(err)
            }}
          />
        </div>
      </div>
      
  )

}

export default StudentPage;
