import React from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div>
      <h1>LoginPage</h1>
      <Link to={{ pathname: "/teacher" }}>학생 리스트 보기</Link>
    </div>
  );
}

export default LoginPage;
