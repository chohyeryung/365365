import React, { useRef, useState } from 'react';
import './rowcomponent.css';
import icon_edit from './icon_edit.png';
import { SERVER } from '../../Config';
import axios from 'axios';

function RowComponent(props) {

  const [editClicked, setEditClicked] = useState(false);
  const [temperature, setTemperature] = useState('');
  const input_temp = useRef(null);
  const hakbun = useRef(null);

  const isEmptyCheck = (color) => {
    if (color === 'green') {
      return 'empty-row';
    } else if (color === 'red') {
      return 'strange-row';
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
    if(temperature !== '') {
      const endpoint = `${SERVER}updating/${hakbun.current.innerText}/${temperature}`;
      axios.post(endpoint)
    }
    
  }
  console.log(props.student.checked_time);
  return (
    
    <>
      <tr className={isEmptyCheck(props.color)} key={props.student.stnum}>
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
