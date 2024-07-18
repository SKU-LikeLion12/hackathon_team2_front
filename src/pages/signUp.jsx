import React from "react";
import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";
import SignupUI from "../components/signupUI";

export default function signUp() {
  return (
    <div>
      <Header />
      <Nav />
      <SignupUI />
      <Footer />
    </div>
  );
}
