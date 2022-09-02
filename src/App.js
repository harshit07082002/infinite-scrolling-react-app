import React, { Suspense } from "react";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              !isLoggedIn ? (
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/home" replace />
              )
            }
          />
          <Route
            path="/home"
            element={isLoggedIn ? <HomePage /> : <Navigate to="/" replace />}
          />
          {/* <Route path="*" element={<Error error={"No Page Found"} />} /> */}
        </Routes>
      </main>
    </>
  );
};

export default App;
