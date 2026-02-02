import Footer from "./components/Footer";
import LenisScroll from "./components/LenisScroll";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes,useLocation } from "react-router-dom";
import Generate from "./pages/Generate";
import About from "./pages/About";
import Login from "./components/Login";
import Error from "./pages/Error";
import { useEffect } from "react";
import MyGenerations from "./pages/MyGenerations";

export default function App() {
    const {pathname} = useLocation()
    useEffect(()=>{
       window.scrollTo(0,0);
    },[pathname])
  return (
    <>
      <LenisScroll />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/generate/:id" element={<Generate />} />
        <Route path="/my-generations" element={<MyGenerations />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/*" element={<Error />} />
      </Routes>

      <Footer />
    </>
  );
}
