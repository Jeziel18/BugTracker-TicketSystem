import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./Components/SideBar/SideBar";

function App() {
  return (
    <div className="d-flex">
      <div className="w-auto">
        <SideBar />
      </div>
      <div className="col overflow-auto">
        <BrowserRouter>
          {/* <Routes> */}
          {/* </Routes><Route path = '/' element = {<><Navbar/><Home/></>}></Route> */}
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
