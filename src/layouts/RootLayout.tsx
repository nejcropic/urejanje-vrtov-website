import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  const [mediaReady, setMediaReady] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);

  // Prevent scroll during intro
  useEffect(() => {
    document.body.classList.add("no-scroll");

    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, 800); // professional intro timing

    return () => clearTimeout(timer);
  }, []);

  // Failsafe: never block more than 3s
  useEffect(() => {
    const failsafe = setTimeout(() => {
      setMediaReady(true);
    }, 3000);

    return () => clearTimeout(failsafe);
  }, []);

  const loading = !(mediaReady && minTimePassed);

  useEffect(() => {
    if (!loading) {
      document.body.classList.remove("no-scroll");
    }
  }, [loading]);

  return (
    <>
      <div className={`page-wrapper ${loading ? "page-loading" : ""}`}>
        <Navbar />
        <main>
          <Outlet context={{ setMediaReady }} />
        </main>
      </div>

      <Loader loading={loading} />
    </>
  );
}
