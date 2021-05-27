import React, { useRef, useState } from 'react';
import './rowcomponent.scss';
import icon_edit from './icon_edit.png';

function RowComponent(props) {

  const [editClicked, setEditClicked] = useState(false);
  const [tempTemperature, settempTemperature] = useState(0);
  const input_temp = useRef(null);

  const isEmptyCheck = (isEmpty) => {
    if (isEmpty) {
      return 'empty-row';
    } else {
      return 'row';
    }
  }

  const updateRows = () => {
    // json 파일에 해당 row temperature과 time 서버에 보내주기
  }

  const handleEditBtn = () => {
    input_temp.current.focus();
    setEditClicked(!editClicked);
  }

  const handleCompleteButton = () => {
    input_temp.current.blur();
    setEditClicked(!editClicked);
    updateRows();
  }

  const handleChange = (e) => {
    settempTemperature(e.target.value)
    console.log(tempTemperature);
  }

  return (
    <>
      <tr className={isEmptyCheck(props.isEmpty)} key={props.student.stnum}>
        <td>{props.student.stnum}</td>
        <td>{props.student.name}</td>
        <td>{props.student.date}</td>
        <td><input type="text" ref={ input_temp } value={props.student.temp} onChange={handleChange} /></td>
        <td>
          {
            editClicked ? (
              <button type="button" style={{ backgroundColor: '#008156', color: 'white', outline: 'none', border: 'none', padding: '3px 5px 3px 5px', borderRadius: '3px', marginTop: '7px', marginBottom: '7px' }} onClick={handleCompleteButton}>
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
