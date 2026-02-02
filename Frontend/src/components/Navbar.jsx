import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <>
      <motion.nav
        className="sticky top-0 z-50 flex items-center justify-between w-full h-18 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
      >
        <Link to="/" className="flex items-center">
          <img
            className="h-9 w-auto"
            src="/assets/logo.svg"
            width={138}
            height={36}
            alt="logo"
          />
          <h1 className="text-[26px] font-medium">autome</h1>
        </Link>

        <div className="hidden lg:flex items-center gap-8 transition duration-500 ">
          <NavLink to={"/"} className="hover:text-slate-300 transition">
            Home
          </NavLink>
          <NavLink to={"/generate"} className="hover:text-slate-300 transition">
            Generate
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to={"/my-generations"}
              className="hover:text-slate-300 transition"
            >
              Generations
            </NavLink>
          )}
          <NavLink to={"/about"} className="hover:text-slate-300 transition">
            About
          </NavLink>
        </div>

        <div className="hidden lg:block space-x-3">
          {isLoggedIn ? (
            <>
              <div className={`relative group`}>
                <button className="rounded-full size-8 bg-white/20 border-2 border-white/10">
                  {user?.name.charAt(0).toUpperCase()}
                </button>
                <div className="absolute hidden group-hover:block top-6 right-0 pt-4">
                  <button
                    onClick={logout}
                    className="bg-white/20 border-2 border-white/10 px-5 py-1.5 rounded"
                  >
                    logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/auth?page=register")}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md active:scale-95"
              >
                Get started
              </button>
              <button
                onClick={() => navigate("/auth?page=login")}
                className="hover:bg-slate-300/20 transition px-6 py-2 border border-slate-400 rounded-md active:scale-95"
              >
                Login
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden active:scale-90 transition"
        >
          <MenuIcon className="size-6.5" />
        </button>
      </motion.nav>
      {/* Navlinks for web view */}
      <div
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 lg:hidden transition-transform duration-400 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
          Home
        </NavLink>

        <NavLink to="/generate" onClick={() => setIsMenuOpen(false)}>
          Generate
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/my-generations" onClick={() => setIsMenuOpen(false)}>
            Generations
          </NavLink>
        )}

        <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
          About
        </NavLink>

        {isLoggedIn ? (
          <button
            onClick={() => {
              setIsMenuOpen(false);
              logout();
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to={"/auth?page=login"}
            >
              Login
            </NavLink>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to={"/auth?page=register"}
            >
              Sign Up
            </NavLink>
          </>
        )}

        <button
          onClick={() => setIsMenuOpen(false)}
          className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex"
        >
          <XIcon />
        </button>
      </div>
    </>
  );
}
