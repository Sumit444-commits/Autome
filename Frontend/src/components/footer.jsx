import { motion } from "framer-motion";
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
          <Link to="/" className="flex max-md:justify-center">
            <img
              className="h-9 w-auto"
              src="/assets/logo.svg"
              width={138}
              height={36}
              alt="logo"
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
            <Link className="hover:text-slate-500 transition" to="#">
              About
            </Link>
            <Link className="hover:text-slate-500 transition" to="#">
              GitHub
            </Link>
            <Link className="hover:text-slate-500 transition" to="#">
              Documentation
            </Link>
            <Link className="hover:text-slate-500 transition" to="#">
              Privacy policy
            </Link>
          </div>
        </div>
        <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
          <p className="max-w-70">
            Making every repository feel professional—no matter the size of your codebase.
          </p>
          <div className="flex items-center gap-4 mt-3">
            <Link to="#" target="_blank" rel="noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-dribbble size-5 hover:text-indigo-500"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path>
                <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path>
                <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path>
              </svg>
            </Link>
            <Link to="#" target="_blank" rel="noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin size-5 hover:text-indigo-500"
                aria-hidden="true"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
            <Link to="#" target="_blank" rel="noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter size-5 hover:text-indigo-500"
                aria-hidden="true"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
            <Link to="#" target="_blank" rel="noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-youtube size-6 hover:text-indigo-500"
                aria-hidden="true"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                <path d="m10 15 5-3-5-3z"></path>
              </svg>
            </Link>
          </div>
          <p className="mt-3 text-center">
            &copy; {new Date().getFullYear()} <Link href="/">Autome</Link>
          </p>
        </div>
      </div>
      <p className="py-4 text-center border-t mt-6 border-slate-700">
        Developed by <Link to="https://sumitsharma.codes">Sumit Sharma</Link> |
        &copy; {new Date().getFullYear()} <Link href="/">Autome</Link>. All
        Rights Reserved.
      </p>
    </motion.footer>
  );
}
