import React from 'react'
import './landingpage.scss';

function LandingPage() {
    return (
        <div className="content-table">
          <table>
              <tr className="table-head">
                <td style={{ width: '100px' }}>학번</td>
                <td style={{ width: '100px' }}>이름</td>
                <td style={{ width: '100px' }}>시간</td>
                <td style={{ width: '100px' }}>체온</td>
              </tr>
              {/* map 함수를 이용해서 서버에서 json 형태로 받아오면 데이터 추출해서 row 추가하기 */}
              <tr className="first">
                <td>3310</td>
                <td>강채현</td>
                <td>08:24</td>
                <td>36.3</td>
              </tr>
          </table>
        </div>
    )
}

export default LandingPage
