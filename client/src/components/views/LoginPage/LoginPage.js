import React from "react";
import "./loginpage.scss";

function LoginPage() {
  return (
    <div className="container">
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
              />
            </li>
          </ul>
          <div className="keep_login_container">
            <div className="keep_login_outline">
              <div className="keep_login_inline"></div>
            </div>
            <p>로그인 상태 유지</p>
          </div>
          <input
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
