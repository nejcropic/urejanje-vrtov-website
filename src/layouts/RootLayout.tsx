import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
        document.body.classList.remove("no-scroll");
      }, 1400); // longer intro timing
    };

    document.body.classList.add("no-scroll");

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
      <div className={`page-wrapper ${loading ? "page-loading" : ""}`}>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>

      <Loader loading={loading} />
    </>
  );
}
