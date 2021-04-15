import React, { useState } from 'react'
import './sidebar.scss'

function Sidebar() {

    const [first, setFirst] = useState(true)
    const [second, setSecond] = useState(false)
    const [third, setThird] = useState(false)

    const handleFirst = () => {
        setFirst(!first);
    }

    const handleSecond = () => {
        setSecond(!second);
    }

    const handleThird = () => {
        setThird(!third);
    }

    return (
        <ul className="side-menu-container">
            <li className={first ? 'side-menu clicked' : 'side-menu'} onClick={handleFirst}>
                <div>
                    <span>1학년</span>
                </div>
            </li>
            <li className={second ? 'side-menu clicked' : 'side-menu'} onClick={handleSecond}>
                <div>
                    <span>2학년</span>
                </div>
            </li>
            <li className={third ? 'side-menu clicked' : 'side-menu'} onClick={handleThird}>
                <div>
                    <span>3학년</span>
                </div>
            </li>
        </ul>
    )
}

export default Sidebar