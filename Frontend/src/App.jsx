import Footer from "./components/footer";
import LenisScroll from "./components/lenis-scroll";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import { Route, Routes,useLocation } from "react-router-dom";
import Generate from "./pages/Generate";
import Showcase from "./pages/Showcase";
import About from "./pages/About";
import Login from "./components/Login";
import Error from "./pages/Error";
import { useEffect } from "react";

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
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Error />} />
      </Routes>

      <Footer />
    </>
  );
}
