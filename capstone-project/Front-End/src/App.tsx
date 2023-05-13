import React, { useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./Components/SideBar/SideBar";
import Navbar from "./Components/Navbar/Navbar";
import CreateReport from "./Components/CreateRerpot/CreateReport";
import Statistics from "./Components/Statistics/Statistics";
import PendientesAEvaluar from "./Components/ReportTables/PendientesAEvaluar";
import Home from "./Components/Home/Home";
import Login from "./Components/Log In/LogIn";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const [userID, setUserID] = useState<number | null>(null);


  const handleLogin = (id: number) => {
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("userID", id.toString());
  setLoggedIn(true);
  setUserID(id);
};

  const handleLogout = () => {
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("userID");
    setLoggedIn(false);
    setUserID(null);
  };


  return (
    <>
      <div>
        <BrowserRouter>
          {loggedIn ? (
            <div className="d-flex">
              <div className="w-auto">
                <SideBar />
              </div>
              <div className="col overflow-auto">
                <Navbar onLogout={handleLogout} />
                <Routes>
                  <Route
                    path="/LogIn"
                    element={
                      <>
                        <Navigate to="/home" />
                      </>
                    }
                  ></Route>
                  <Route
                    path="/home"
                    element={
                      <>
                        <Home />
                      </>
                    }
                  ></Route>
                  <Route
                    path="/crearReporte"
                    element={
                      <>
                        <CreateReport user_id={userID}/>
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
              </div>
            </div>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
