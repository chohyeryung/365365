import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";


const StudentPage = () => {

  const handleScan = (result)=>{
    console.log(result);
  }

  const handleError = (err)=>{
    console.error(err)
  }


  const [ data, setData ] = React.useState('Not Found');
 
  return (
    <div>
      <div className="barcodwebcam">
        <BarcodeScannerComponent
          width={800}
          height={600}
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
