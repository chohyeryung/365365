import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { saveGrade } from '../../../_actions/send_actions';
import './sidebar.scss'

function Sidebar() {
    const dispatch = useDispatch();

    const [first, setFirst] = useState(true);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);

    let dataToSubmit = [first, second, third]

    useEffect(() => {
        dispatch(saveGrade(dataToSubmit));
    })

    const handleFirst = () => {
        setFirst(true);
        setSecond(false);
        setThird(false);
    }

    const handleSecond = () => {
        setFirst(false);
        setSecond(true);
        setThird(false);
    }

    const handleThird = () => {
        setFirst(false);
        setSecond(false);
        setThird(true);
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
