import React, { useState } from "react";
import "./loginpage.css";
import login from "./login.json";

function LoginPage({ history }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  console.log(login.id);
  console.log(login.pw);
  const goTeacher = () => {
    if (id === login.id && pw === login.pw) {
      history.push("/teacher");
    } else {
      alert("올바른 아이디와 비밀번호를 입력해주세요.");
    }
  };
  return (
    <div className="container">
      <span className="logo"><a href='/' style={{ textDecoration: 'none' }}>365, 36.5</a></span>
      <div className="white_box">
        <div className="title_box">
          <p className="top_title">365, 36.5</p>
          <p className="bottom_title">로그인</p>
        </div>
        <div className="content_box">
          <ul className="padding_box">
            <li>
              <p className="id_pw_text">ID</p>
            </li>
            <li>
              <input
                className="id_pw_input"
                type="text"
                placeholder="아이디를 입력해주세요"
                onChange={({ target: { value } }) => setId(value)}
              />
            </li>
          </ul>
          <ul className="padding_box">
            <li>
              <p className="id_pw_text">Password</p>
            </li>
            <li>
              <input
                className="id_pw_input"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onChange={({ target: { value } }) => setPw(value)}
              />
            </li>
          </ul>
          <input
            onClick={goTeacher}
            className="login_btn"
            type="button"
            name="login"
            value="로그인"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
