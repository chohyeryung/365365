import React, { useEffect, useState } from 'react'
import './navbar.scss';
import { useDispatch } from 'react-redux';
import { saveMajor } from '../../../_actions/send_actions';
import icon_download from './icon_download.png';

function Navbar() {
    const dispatch = useDispatch();

    const [menuClick, setmenuClick] = useState([true, false, false]);

    useEffect(() => {
        dispatch(saveMajor(menuClick));
    })
    
    const handleClick = (index) => {
        let newClick = menuClick.map((menu, i) => {
            if(i === index) menu = true;
            else menu = false;
            return menu;
        })
        setmenuClick(newClick);
    }

    const handleDownloadBtn = () => {
        
    }
    
    return (
        <nav className="NavbarItems">
            
                <span className="navbar-logo"><a href='/' style={{ textDecoration: 'none' }}>365, 36.5</a></span>
            
            <ul className="nav-menu-container">
                <li className={menuClick[0] ? 'nav-menu clicked' : 'nav-menu'} onClick={() => handleClick(0)}>
                    <div>
                        <span>
                            뉴미디어소프트웨어
                        </span>
                    </div>
                </li>
                <li className={menuClick[1] ? 'nav-menu clicked' : 'nav-menu'} onClick={() => handleClick(1)}>
                    <div>
                        <span>
                            뉴미디어웹솔루션
                        </span>
                    </div>
                </li>
                <li className={menuClick[2] ? 'nav-menu clicked' : 'nav-menu'} onClick={() => handleClick(2)}>
                    <div>
                        <span>
                            뉴미디어디자인
                        </span>
                    </div>
                </li>
                <li onClick={handleDownloadBtn}>
                    <div>
                        <button className="download_btn">
                            <img src={icon_download} alt="edit icon" width={40} height={40} />
                        </button>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
