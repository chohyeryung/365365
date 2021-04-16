import React from "react";
import { Link } from "react-router-dom";

function StudentPage() {
  return (
    <div>
      <Link to={{ pathname: "/teacher" }}>학생 리스트 보기</Link>
      <h1>StudentPage</h1>
    </div>
  );
}

export default StudentPage;
