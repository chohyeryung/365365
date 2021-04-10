import React, { useState } from 'react'
import { MenuItems } from './MenuItems';
import './sidebar.scss'

function Sidebar() {

    const [clicked, setClicked] = useState(false)

    const onHandleClickMenu = () => {
        setClicked(!clicked)
    }

    return (
        <ul className="side-menu-container">
            {MenuItems.map((item, index) => {
                return(
                    <li className={clicked ? 'side-menu active' : 'side-menu'} key={index} onClick={onHandleClickMenu}>
                        <div>
                            <span className={item.cName} href={item.url}>
                                {item.title}
                            </span>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default Sidebar
