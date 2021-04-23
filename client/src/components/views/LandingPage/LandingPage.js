import React, { useState, createRef } from 'react'
import './landingpage.scss';
import RowComponent from './RowComponent';

function LandingPage() {

  const example_data = [
    {stnum : 3301, name: '김나영', time: '08 : 24', temp: '34.4'},
    {stnum : 3302, name: '김민정', time: '', temp: ''},
    {stnum : 3303, name: '김아라', time: '08 : 24', temp: '34.4'},
    {stnum : 3304, name: '김지연', time: '08 : 24', temp: '34.4'},
    {stnum : 3305, name: '나현아', time: '08 : 24', temp: '34.4'},
    {stnum : 3306, name: '맹수연', time: '', temp: ''},
    {stnum : 3307, name: '박재연', time: '08 : 24', temp: '34.4'},
    {stnum : 3308, name: '이가람', time: '', temp: ''},
    {stnum : 3309, name: '이서연', time: '08 : 24', temp: '34.4'},
    {stnum : 3310, name: '이승민', time: '08 : 24', temp: '34.4'},
    {stnum : 3311, name: '이승아', time: '', temp: ''},
    {stnum : 3312, name: '조하닮', time: '08 : 24', temp: '34.4'},
  ]

  const [editClicked, setEditClicked] = useState(false)
  const [tempTemperature, settempTemperature] = useState(0)
  const input_temp = createRef();

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
              {example_data.map(function(student, i) {
                  return (
                    student.temp === '' && student.time === '' ? 
                    <RowComponent key={ student.stnum } student={ student } isEmpty= { true } />
                    :
                    <RowComponent key={ student.stnum } student={ student } isEmpty= { false } />
                  )
                })
              }
              </tbody>
              
          </table>
        </div>
    )
}

export default LandingPage
