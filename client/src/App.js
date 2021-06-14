import "./App.css";
import { HashRouter, Route } from "react-router-dom";
import MainPage from "./components/views/MainPage/MainPage";
import TeacherPage from "./components/views/TeacherPage/TeacherPage";
import StudentPage from "./components/views/StudentPage/StudentPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import InputTempPage from "./components/views/InputTempPage/InputTempPage";

function App() {
  return (
    <HashRouter>
      <Route path="/" exact={true} component={MainPage} />
      <Route path="/student" exact={true} component={StudentPage} />
      <Route path="/teacher" exact={true} component={TeacherPage} />
      <Route path="/login" exact={true} component={LoginPage} />
      <Route path="/InputTemp" exact={true} component={InputTempPage} />

    </HashRouter>
  );
}

export default App;
