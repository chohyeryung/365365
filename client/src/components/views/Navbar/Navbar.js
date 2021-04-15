import React, { useState } from 'react'
import './navbar.scss';

function Navbar() {

    const [softClick, setsoftClick] = useState(true);
    const [webClick, setwebClick] = useState(false);
    const [designClick, setdesignClick] = useState(false);

    const handleSoftware = () => {
        setsoftClick(!softClick);
    }

    const handleWeb = () => {
        setwebClick(!webClick);
    }

    const handleDesign = () => {
        setdesignClick(!designClick);
    }

    return (
        <nav className="NavbarItems">
            <span className="navbar-logo" href="/">365,36.5</span>
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
