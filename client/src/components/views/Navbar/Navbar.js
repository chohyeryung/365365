import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './navbar.scss';

function Navbar() {

    const [softClick, setsoftClick] = useState(true);
    const [webClick, setwebClick] = useState(false);
    const [designClick, setdesignClick] = useState(false);

    const handleSoftware = () => {
        setsoftClick(true);
        setwebClick(false);
        setdesignClick(false);
    }

    const handleWeb = () => {
        setsoftClick(false);
        setwebClick(true);
        setdesignClick(false);
    }

    const handleDesign = () => {
        setsoftClick(false);
        setwebClick(false);
        setdesignClick(true);
    }

    return (
        <nav className="NavbarItems">
            
                <span className="navbar-logo"><a href='/' style={{ textDecoration: 'none' }}>365, 36.5</a></span>
            
            <ul className="nav-menu-container">
                <li className={softClick ? 'nav-menu clicked' : 'nav-menu'} onClick={handleSoftware}>
                    <div>
                        <span>
                            뉴미디어소프트웨어
                        </span>
                    </div>
                </li>
                <li className={webClick ? 'nav-menu clicked' : 'nav-menu'} onClick={handleWeb}>
                    <div>
                        <span>
                            뉴미디어웹솔루션
                        </span>
                    </div>
                </li>
                <li className={designClick ? 'nav-menu clicked' : 'nav-menu'} onClick={handleDesign}>
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
