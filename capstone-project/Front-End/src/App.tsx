import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./Components/SideBar/SideBar";
import Navbar from "./Components/Navbar/Navbar";
import CreateReport from "./Components/CreateRerpot/CreateReport";

function App() {
  return (
    <div className="d-flex">
      <div className="w-auto">
        <SideBar />
      </div>
      <div className="col overflow-auto">
        <Navbar />
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<></>}></Route>
              <Route
                path="/createReport"
                element={
                  <>
                    <CreateReport />
                  </>
                }
              ></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
