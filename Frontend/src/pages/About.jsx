import React from "react";
import SectionTitle from "../components/SectionTitle";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <SectionTitle
        title="About autome"
        description="A technical breakdown of our automation process—each repository analyzed with precision, logic, and speed."
      />
      <section className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4 mt-18">
        <div className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0">
          <img
            className="max-w-md w-full object-cover rounded-2xl"
            src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=451&h=451&auto=format&fit=crop"
            alt=""
          />
          <motion.div
           initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 240,
              damping: 70,
              mass: 1,
            }}
          className="flex items-center gap-1 max-w-72 absolute bottom-8 left-8 bg-white p-4 rounded-xl">
            <div className="flex -space-x-4 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                alt="image"
                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-1"
              />
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                alt="image"
                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[2]"
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                alt="image"
                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[3]"
              />
              <div className="flex items-center justify-center text-xs  text-white size-9 rounded-full border-[3px] border-white bg-indigo-600 hover:-translate-y-1 transition z-[4]">
                50+
              </div>
            </div>
            <p className="text-sm font-medium text-slate-800">
              Join our developer community
            </p>
          </motion.div>
        </div>
        <div className="text-sm text-white max-w-lg">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 70,
              mass: 1,
            }}
            className="text-xl uppercase font-semibold"
          >
            What we do?
          </motion.h1>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 70,
              mass: 1,
            }}
            className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF]"
          ></motion.div>
          <motion.p
            className="mt-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          >
            Autome helps you showcase your code faster by transforming raw
            GitHub repositories into fully functional, production-ready
            documentation.{" "}
          </motion.p>
          <motion.p
            className="mt-4"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          >
            Whether you are launching an open-source tool, a personal portfolio,
            or a complex enterprise system, our AI engine is crafted to boost
            your project's visibility and professional appeal.
          </motion.p>
          <motion.p
            className="mt-4"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 240,
              damping: 70,
              mass: 1,
            }}
          >
            From analyzing directory structures to identifying core tech stacks,
            Autome empowers you to build professional project identities and
            scale your developer presence effortlessly.
          </motion.p>
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
                delay: 0.2,
              type: "spring",
              stiffness: 320,
              damping: 70,
              mass: 1,
            }}
          
            className="flex items-center w-max gap-2 mt-8 hover:-translate-y-0.5 transition bg-indigo-600  py-3 px-8 rounded-full text-white"
          >
            <span>Read more</span>
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                fill="#fff"
              />
            </svg>
          </motion.button>
        </div>
      </section>
    </>
  );
};

export default About;
