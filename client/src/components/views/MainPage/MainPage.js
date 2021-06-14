import React from "react";
import { Link } from "react-router-dom";
import "./mainpage.css";

function MainPage() {
  return (
    <div className="maincontainer">
      <p className="top_text">더욱 간편한 일일 자가진단 서비스</p>
      <p className="bottom_text">365, 36.5</p>

      <Link to={{ pathname: "/student" }}>
        <div className="outline_circle">
          <div className="inline_circle">
            <div className="go_student">
              <p className="student_top">365, 36.5</p>
              <p className="student_bottom">학생증 리더기 접속</p>
            </div>
          </div>
        </div>
      </Link>

      <Link to={{ pathname: "/login" }}>
        <p className="go_login">관리자로 로그인</p>
      </Link>
    </div>
  );
}

export default MainPage;
