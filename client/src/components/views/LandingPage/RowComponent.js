import React, { useRef, useState } from 'react';
import './rowcomponent.scss';
import axios from 'axios';
import icon_edit from './icon_edit.png';
import { SERVER } from '../../Config';

function RowComponent(props) {

  const [editClicked, setEditClicked] = useState(false);
  const [temperature, setTemperature] = useState('');
  const input_temp = useRef(null);
  const hakbun = useRef(null);

  const isEmptyCheck = (isEmpty) => {
    if (isEmpty) {
      return 'empty-row';
    } else {
      return 'row';
    }
  }

  const handleEditBtn = () => {
    input_temp.current.focus();
    setEditClicked(!editClicked);
  }
  
  // temp가 update 되었을 때, 서버에 보내는 용도
  const handleCompleteButton = () => {
    input_temp.current.blur();
    setEditClicked(!editClicked);
    const endpoint = `${SERVER}updating/${hakbun.current.innerText}/${temperature}`;
    
    axios.get(endpoint)
  }

  return (
    <>
      <tr className={isEmptyCheck(props.isEmpty)} key={props.student.stnum}>
        <td ref= { hakbun }>{props.student.stnum}</td>
        <td>{props.student.name}</td>
        <td>{props.student.checked_time}</td>
        <td>
          <input type="text" ref={ input_temp } placeholder={props.student.temp} onChange={({ target: { value } }) => setTemperature(value)} />
        </td>
        <td>
          {
            editClicked ? (
              <button type="button" style={{ backgroundColor: '#008156', color: 'white', outline: 'none', border: 'none', padding: '3px 5px 3px 5px', borderRadius: '3px', marginTop: '7px', marginBottom: '7px' }} onClick={ handleCompleteButton }>
              완료
              </button>
            ) :
              (
                <button className="edit-btn" onClick={handleEditBtn}>
                  <img src={icon_edit} alt="edit icon" width={35} height={35} color={'#00000059'}></img>
                </button>
              )
          }

        </td>
      </tr>
    </>
  )
}

export default RowComponent
