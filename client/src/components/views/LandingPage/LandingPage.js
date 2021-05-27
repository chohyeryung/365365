import axios from 'axios';
import React, { useState, createRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { SERVER } from '../../Config';
import './landingpage.scss';
import RowComponent from './RowComponent';

function LandingPage() {

  // States
  const [Students, setStudents] = useState([]);

  // get states from redux store
  const { grade, major } = useSelector(state => ({
    grade: state.send.grade,
    major: state.send.major
  }));
  
  const endpoint = `${SERVER}students/${grade}/${major}`;
  axios.get(endpoint)
  .then(response => setStudents([...response.data]))
  
    return (
        <div className="content-table">
          <table>
              <tbody>
              <tr className="table-head">
                <td style={{ width: '100px' }}>학번</td>
                <td style={{ width: '100px' }}>이름</td>
                <td style={{ width: '100px' }}>시간</td>
                <td style={{ width: '100px' }}>체온</td>
              </tr>
              {/* map 함수를 이용해서 서버에서 json 형태로 받아오면 데이터 추출해서 row 추가하기 */}
              {Students.map(function(student, i) {
                  return (
                    student.temp === '' && student.date === '' ? 
                    <RowComponent key={ Number(student.stnum) } student={ student } isEmpty= { true } />
                    :
                    <RowComponent key={ Number(student.stnum) } student={ student } isEmpty= { false } />
                  )
                })
              }
              </tbody>
              
          </table>
        </div>
    )
}

export default LandingPage
