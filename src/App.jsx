import React from "react";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Support from "./pages/Support";
import Wellness from "./pages/Wellness";
import Shimple from "./pages/Shimple";
import HealingMeditation from "./pages/HealingMeditation";
import NatureForestTherapy from "./pages/NatureForestTherapy";
import OrientalMedicine from "./pages/OrientalMedicine";
import View from "./pages/View";
import BeautySpa from "./pages/BeautySpa";
import Book from "./pages/Book";

import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/support" element={<Support />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/shimple" element={<Shimple />} />
          <Route path="/healingMeditation" element={<HealingMeditation />} />
          <Route
            path="/natureForestTherapy"
            element={<NatureForestTherapy />}
          />
          <Route path="/orientalMedicine" element={<OrientalMedicine />} />
          <Route path="/view" element={<View />} />
          <Route path="/beautySpa" element={<BeautySpa />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
