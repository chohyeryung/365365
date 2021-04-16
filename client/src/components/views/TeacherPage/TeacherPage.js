import React from "react";
import LandingPage from "../LandingPage/LandingPage";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

function TeacherPage() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#008156",
      }}
    >
      <Navbar />
      <div style={{ display: "flex", height: "100%" }}>
        <Sidebar />
        <LandingPage />
      </div>
    </div>
  );
}

export default TeacherPage;
