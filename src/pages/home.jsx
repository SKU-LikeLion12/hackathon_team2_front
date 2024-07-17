import React from "react";
import Header from "./../components/header";
import Footer from "../components/footer";
import Nav from "../components/nav";
import Map from "../components/map";
import Search from "../components/search";

export default function Home() {
  return (
    <div>
      <Header />
      <Nav />
      <Search />
      <Map />
      <Footer />
    </div>
  );
}
