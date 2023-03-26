import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";
import Dropdown from "./Dropdown";
import "../public/style.css";
import logo from "../public/logo.png";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-black py-3 top-0 left-0 right-0 shadow-md">
        <div className="flex justify-between items-center py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button
              className="ml-4 text-white hover:text-neutral-400"
              onClick={() => setOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <Link to={"/"}>
              <h1 className="ml-4 text-3xl font-bold leading-tight text-white hover:text-gray-300 ">
                <img src={logo} />
              </h1>
            </Link>
          </div>

          <nav className="flex space-x-4 font-bold">
            <Link to={"/"}>
              <p className="text-white hover:text-neutral-400 text-2xl">
                Sedes
              </p>
            </Link>
            <Link to={"/"}>
              <p className="text-white hover:text-neutral-400 text-2xl">
                Membresias
              </p>
            </Link>
            <Link to={"/"}>
              <p className="text-white hover:text-neutral-400 text-2xl">
                Clases
              </p>
            </Link>
          </nav>
          <nav className="flex space-x-1 font-bold text-xl">
            <Dropdown />
            <div className="text-white">
              <i className="bx bx-user text-2xl"></i>
            </div>
          </nav>

          <div
            className={`${
              !open && "hidden"
            } bg-gray-600/50 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm`}
            onClick={() => setOpen(false)}
          ></div>

          <div
            className={`${
              open ? "w-80" : "w-0"
            } bg-black min-h-screen fixed top-0 left-0 transition-all duration-300`}
          >
            <div className={`${!open && "hidden"} pt-3`}>
              <button
                className="ml-4 text-white mb-14"
                onClick={() => setOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <a
                href={"/instructores"}
                className="block text-center text-white text-xl hover:bg-neutral-800 cursor-pointer py-3 mb-2"
              >
                Instructores
              </a>

              <a
                href={"/clases"}
                className="block text-center text-white text-xl hover:bg-neutral-800 cursor-pointer py-3 mb-2"
              >
                Clases
              </a>
            </div>
          </div>
        </div>
      </div>

      <Outlet />

      <Footer />
    </>
  );
};

export default Header;
