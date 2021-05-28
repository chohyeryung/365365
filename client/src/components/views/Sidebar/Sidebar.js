import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { saveGrade } from '../../../_actions/send_actions';
import './sidebar.scss'

function Sidebar() {
    const dispatch = useDispatch();

    const [menuClick, setmenuClick] = useState([true, false, false, false]);

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

    return (
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
    )
}

export default Sidebar
