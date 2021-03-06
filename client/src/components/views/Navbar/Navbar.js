import React, { useEffect, useState } from 'react'
import './navbar.css';
import { useDispatch } from 'react-redux';
import { saveMajor } from '../../../_actions/send_actions';

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
            </ul>
        </nav>
    )
}

export default Navbar
