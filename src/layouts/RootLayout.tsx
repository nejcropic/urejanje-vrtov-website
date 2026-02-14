import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ScrollTopButton from "../components/ScrollTopButton";
import SmoothScroll from "../components/SmoothScroll";
import ScrollProgressBar from "../components/ScrollProgressBar";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("no-scroll");

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.classList.remove("no-scroll");
    }, 1200); // elegant intro delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="page-wrapper">
        <SmoothScroll />
        <ScrollProgressBar />
        <ScrollToTop />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollTopButton />
      </div>

      <Loader loading={loading} />
    </>
  );
}
