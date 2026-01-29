import { motion } from "framer-motion";
import { GithubIcon, Instagram, Mail, Linkedin, Globe } from "lucide-react"; // Added Linkedin and Globe
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <motion.footer
      className="px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-400 mt-40"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
        <div className="sm:col-span-2 lg:col-span-1 max-md:items-center max-md:text-center">
          <Link to="/" className="flex items-center max-md:justify-center gap-2">
            <img
              className="h-9 w-auto"
              src="/assets/logo.svg"
              width={138}
              height={36}
              alt="autome logo"
            />
            <h1 className="text-[26px] font-medium text-white">autome</h1>
          </Link>
          <p className="text-sm/7 mt-6">
            An AI-powered documentation generator designed to help developers
            showcase their projects with professional, automated READMEs.
          </p>
        </div>

        <div className="flex flex-col lg:items-center lg:justify-center max-md:items-center max-md:text-center">
          <div className="flex flex-col text-sm space-y-2.5">
            <h2 className="font-semibold mb-5 text-white">Company</h2>
            <Link to="/about" className="hover:text-slate-200 transition">About</Link>
            <a href="https://github.com/Sumit444-commits/autome" target="_blank" rel="noreferrer" className="hover:text-slate-200 transition">GitHub</a>
            <Link to="#" className="hover:text-slate-200 transition">Documentation</Link>
            <Link to="#" className="hover:text-slate-200 transition">Privacy policy</Link>
          </div>
        </div>

        <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
          <p className="max-w-70">
            Making every repository feel professional—no matter the size of your codebase.
          </p>
          <div className="flex items-center gap-4 mt-3">
            {/* Using Lucide Components instead of raw SVGs for cleaner code */}
            <a href="https://sumitsharma.codes" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition">
              <Globe size={20} />
            </a>
            <a href="https://www.linkedin.com/in/sumit-sharma-a0b2c7" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition">
              <Linkedin size={20} />
            </a>
            <a href="mailto:sumit8444061@gmail.com" className="hover:text-indigo-500 transition">
              <Mail size={20} />
            </a>
            <a href="https://www.instagram.com/sumit_103447" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition">
              <Instagram size={20} />
            </a>
            <a href="https://github.com/Sumit444-commits" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition">
              <GithubIcon size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="py-8 text-center border-t mt-12 border-slate-800">
        <p>
          Developed by <a href="https://sumitsharma.codes" className="text-white hover:text-indigo-400 transition">Sumit Sharma</a> | 
          &copy; {new Date().getFullYear()} Autome. All Rights Reserved.
        </p>
      </div>
    </motion.footer>
  );
}