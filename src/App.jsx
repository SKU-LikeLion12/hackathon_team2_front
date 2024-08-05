import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SearchProvider } from "./contexts/SearchContext";
import { UserProvider } from "./contexts/UserContext";
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
import OwnerLogin from "./pages/ownerLogin";
import Master from "./components/master";
import Booking from "./pages/booking";
import Header from "./components/header";
import Nav from "./components/nav";
import DetailInfo from "./pages/detailInfo";
import Scrap from "./pages/scrap";

const App = () => {
  return (
    <AuthProvider>
      <SearchProvider>
        <div className="App">
          <BrowserRouter className="flex w-[80%] mx-auto py-4 font-['GmarketSans']">
            <Header />
            <Nav className="z-10" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/logIn" element={<LogIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/support" element={<Support />} />
              <Route path="/wellness" element={<Wellness />} />
              <Route path="/shimple" element={<Shimple />} />
              <Route
                path="/healingMeditation"
                element={<HealingMeditation />}
              />
              <Route
                path="/natureForestTherapy"
                element={<NatureForestTherapy />}
              />
              <Route path="/orientalMedicine" element={<OrientalMedicine />} />
              <Route path="/view" element={<View />} />
              <Route path="/beautySpa" element={<BeautySpa />} />
              <Route path="/book/:id" element={<Book />} />
              <Route path="/detailInfo/:id" element={<DetailInfo />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/scrap" element={<Scrap />} />
              <Route path="/master" element={<Master />} />
              <Route path="/ownerlogin" element={<OwnerLogin />} />
            </Routes>
          </BrowserRouter>
        </div>
      </SearchProvider>
    </AuthProvider>
  );
};

export default App;
