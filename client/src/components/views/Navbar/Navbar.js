import React, { useState } from 'react'
import { MenuItems } from './MenuItems';
import './navbar.scss';

function Navbar() {

    const [clicked, setClicked] = useState(false)

    const onHandleClickMenu = () => {
        setClicked(!clicked)
    }

    return (
        <nav className="NavbarItems">
            <span className="navbar-logo" href="/">365,36.5</span>
            <ul className="nav-menu-container">
                {MenuItems.map((item, index) => {
                    return(
                        <li className={clicked ? 'nav-menu active' : 'nav-menu'} key={index} onClick={onHandleClickMenu}>
                            <div>
                                <span className={item.cName} href={item.url}>
                                    {item.title}
                                </span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Navbar
