import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Mail from "./Mail";
import EmailList from "./EmailList";
import SendMail from "./SendMail";
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <div className="app__body">
          <Sidebar />

          <Routes>
            <Route path="/mail" element={<Mail />} />
            <Route path="/" element={<EmailList />} />
          </Routes>
          <SendMail />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
