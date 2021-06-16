import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { SERVER } from '../../Config';
import { saveGrade } from '../../../_actions/send_actions';
import xlsx from 'xlsx';
import icon_download from './icon_download.png';
import './sidebar.css'

function Sidebar() {
    const dispatch = useDispatch();

    const [Students, setStudents] = useState([]);
    const [menuClick, setmenuClick] = useState([true, false, false, false]);
    const [downloadClick, setdownloadClick] = useState(false);
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');

    useEffect(() => {
        dispatch(saveGrade(menuClick));
    })
    
    const handleClick = (index) => {
        let newClick = menuClick.map((menu, i) => {
            if(i === index) menu = true;
            else menu = false;
            return menu;
        })
        setmenuClick(newClick);
    }

    const handleDownloadBtnClick = () => {
        setdownloadClick(!downloadClick);
    }

    const handleComplete = () => {
        const endpoint = `${SERVER}file_saving/${year}-${month}-${day}`;
        axios.get(endpoint)
        .then(response => {
            setStudents([...response.data])})
        
        const wb = xlsx.utils.book_new();
        const dataWS = xlsx.utils.json_to_sheet(Students);
        xlsx.utils.book_append_sheet(wb, dataWS, `${year}-${month}-${day}_students`);
        xlsx.writeFile(wb, `${year}-${month}-${day} 체온 측정 데이터.xlsx`)
    }

    const handleCancel = () => {
        setdownloadClick(!downloadClick);
    }

    return (
        <div style={{ display:'flex', flexDirection:'column' }}>
            <ul className="side-menu-container">
                <li className={menuClick[0] ? 'side-menu clicked' : 'side-menu'} onClick={() => handleClick(0)}>
                    <div>
                        <span>1학년</span>
                    </div>
                </li>
                <li className={menuClick[1] ? 'side-menu clicked' : 'side-menu'} onClick={() => handleClick(1)}>
                    <div>
                        <span>2학년</span>
                    </div>
                </li>
                <li className={menuClick[2] ? 'side-menu clicked' : 'side-menu'} onClick={() => handleClick(2)}>
                    <div>
                        <span>3학년</span>
                    </div>
                </li>
                <li className={menuClick[3] ? 'side-menu clicked' : 'side-menu'} onClick={() => handleClick(3)}>
                    <div>
                        <span>미측정자</span>
                    </div>
                </li>
            </ul>
            {
                downloadClick ? (
                    <div className="download-box">
                        <input type="text" className="year-box" placeholder="YYYY" onChange={({ target: { value } }) => setYear(value)} />
                        <input type="text" className="month-box" placeholder="MM" onChange={({ target: { value } }) => setMonth(value)} />
                        <input type="text" className="date-box" placeholder="DD" onChange={({ target: { value } }) => setDay(value)} />
                        <div style={{ display:'flex', flexDirection:'row' }}>
                            <button className="cancel-btn" onClick={handleCancel}>취소</button>
                            <button className="complete-btn" onClick={handleComplete}>완료</button>
                        </div>
                        
                    </div>
                ) : (
                    <button className="download-btn">
                        <img src={icon_download} alt="edit icon" width={40} height={40} onClick={handleDownloadBtnClick} />
                    </button>
                )
            }
        </div>
    )
}

export default Sidebar
