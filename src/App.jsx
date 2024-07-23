import React from "react";
import Home from "./pages/home";
import LogIn from "./pages/logIn";
import SignUp from "./pages/signUp";
import Support from "./pages/support";
import Wellness from "./pages/wellness";
import Shimple from "./pages/shimple";
import HealingMeditation from "./pages/HealingMeditation";
import NatureForestTherapy from "./pages/NatureForestTherapy";
import OrientalMedicine from "./pages/OrientalMedicine";
import View from "./pages/view";
import BeautySpa from "./pages/BeautySpa";
import Book from "./pages/book";

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
