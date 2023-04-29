import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./Components/SideBar/SideBar";
import Navbar from "./Components/Navbar/Navbar";
import CreateReport from "./Components/CreateRerpot/CreateReport";
import Statistics from "./Components/Statistics/Statistics";
import PendientesAEvaluar from "./Components/ReportTables/PendientesAEvaluar";

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
                path="/crearReporte"
                element={
                  <>
                    <CreateReport />
                  </>
                }
              ></Route>
              <Route
                path="/generarInformes"
                element={
                  <>
                    <Statistics />
                  </>
                }
              ></Route>
              <Route
                path="/pendientesAEvaluar"
                element={
                  <>
                    <PendientesAEvaluar />
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
