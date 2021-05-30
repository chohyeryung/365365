import React from "react";
import LandingPage from "../LandingPage/LandingPage";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

function TeacherPage() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 'auto',
        height: 'auto',
        padding: 0,
        margin: 0,
        backgroundColor: "#008156",
        boxSizing: 'border-box',
      }}
    >
      <Navbar />
      <div style={{ display: "flex", height: "100%", zIndex: 1 }}>
        <Sidebar />
        <LandingPage />
      </div>
    </div>
  );
}

export default TeacherPage;
