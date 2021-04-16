import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div>
      <Link to={{ pathname: "/student" }}>
        <div>
          <h2>365, 36.5</h2>
          <h5>학생증 리더기 접속</h5>
        </div>
      </Link>
      <Link to={{ pathname: "/login" }}>
        <h3>관리자로 로그인</h3>
      </Link>
    </div>
  );
}

export default MainPage;
