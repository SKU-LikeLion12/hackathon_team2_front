import React from "react";
import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";
import LoginUI from "../components/loginui";
import { Link } from "react-router-dom";

export default function logIn() {
  return (
    <div>
      <Header />
      <Nav />
      <LoginUI />
      <Footer />
    </div>
  );
}
