import React, { useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./Components/SideBar/SideBar";
import SideBarENG from "./Components/SideBar/SideBarENG";
import Navbar from "./Components/Navbar/Navbar";
import NavbarENG from "./Components/Navbar/NavbarENG";
import CreateReport from "./Components/CreateRerpot/CreateReport";
import CreateReportENG from "./Components/CreateRerpot/CreateReportENG";
import Statistics from "./Components/Statistics/Statistics";
import StatisticsENG from "./Components/Statistics/StatisticsENG";
import PendientesAEvaluar from "./Components/ReportTables/PendientesAEvaluar";
import PendientesAEvaluarENG from "./Components/ReportTables/PendientesAEvaluarENG";
import Home from "./Components/Home/Home";
import HomeENG from "./Components/Home/HomeENG";
import Login from "./Components/Log In/LogIn";
import PendientesAAtender from "./Components/ReportTables/PendientesAAtender";
import PendientesAAtenderENG from "./Components/ReportTables/PendientesAAtenderENG";
import SolicitudesCerradas from "./Components/ReportTables/SolicitudesCerradas";
import SolicitudesCerradasENG from "./Components/ReportTables/SolicitudesCerradasENG";
import TodosLosReportes from "./Components/ReportTables/TodosLosReportes";
import TodosLosReportesENG from "./Components/ReportTables/TodosLosReportesENG";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const [userID, setUserID] = useState<number | null>(null);
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("language") || "es"
  );

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

  const onLanguageChange = (language:string) => {
    localStorage.setItem("language", language)
    setLanguage(language)
  }

  useEffect(() => {
  document.documentElement.lang = language;
  }, [language]);


  return (
    <>
      <div>
        <BrowserRouter>
          {loggedIn ? (
            <div className="d-flex">
              <div className="w-auto">
                {language === "es" ? (
                    <SideBar />
                ) : (
                    <SideBarENG />
                )}
              </div>
              <div className="col overflow-auto">
                {language === "es" ? (
                    <Navbar onLogout={handleLogout}  onLanguageChange={onLanguageChange}/>
                ) : (
                    <NavbarENG onLogout={handleLogout} onLanguageChange={onLanguageChange}/>
                )}
                <Routes>
                  <Route
                    path="/LogIn"
                    element={
                      <>
                        <Navigate to ="/home" />
                      </>
                    }
                  ></Route>
                  <Route
                    path="/home"
                    element={
                      <>
                        {language === "es" ? (
                          <Home />
                        ) : (
                          <HomeENG />
                        )}
                      </>
                    }
                  ></Route>
                  <Route
                    path="/crearReporte"
                    element={
                      <>
                        {language === "es" ? (
                          <CreateReport user_id={userID}/>
                        ) : (
                          <CreateReportENG user_id={userID}/>
                        )}
                      </>
                    }
                  ></Route>
                  <Route
                    path="/generarInformes"
                    element={
                      <>
                        {language === "es" ? (
                          <Statistics />
                        ) : (
                          <StatisticsENG />
                        )}
                      </>
                    }
                  ></Route>
                  <Route
                    path="/pendientesAEvaluar"
                    element={
                      <>
                        {language === "es" ? (
                          <PendientesAEvaluar />
                        ) : (
                          <PendientesAEvaluarENG />
                        )}
                      </>
                    }
                  ></Route>
                  <Route
                    path="/pendientesAAtender"
                    element={
                      <>
                        {language === "es" ? (
                          <PendientesAAtender />
                        ) : (
                          <PendientesAAtenderENG />
                        )}
                      </>
                    }
                  ></Route>
                  <Route
                    path="/solicitudesCerradas"
                    element={
                      <>
                        {language === "es" ? (
                          <SolicitudesCerradas />
                        ) : (
                          <SolicitudesCerradasENG />
                        )}
                      </>
                    }
                  ></Route>
                  <Route
                    path="/todosLosReportes"
                    element={
                      <>
                        {language === "es" ? (
                          <TodosLosReportes />
                        ) : (
                          <TodosLosReportesENG />
                        )}
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
