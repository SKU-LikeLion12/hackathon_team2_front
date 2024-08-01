import React from "react";
import Footer from "../components/footer";
import LoginUI from "../components/loginui";
import { Link } from "react-router-dom";

export default function logIn() {
  return (
    <div>
      <LoginUI />
      <Footer />
    </div>
  );
}
