import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollTopButton from "../components/ScrollTopButton";
import ScrollToTop from "../components/ScrollToTop";

export default function RootLayout() {
  useEffect(() => {
    const loader = document.getElementById("initial-loader");
    if (loader) {
      loader.style.opacity = "0";
      loader.style.transition = "opacity 0.4s ease";
      setTimeout(() => loader.remove(), 400);
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollTopButton />
    </>
  );
}
