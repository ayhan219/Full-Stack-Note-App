import React from "react";
import "./Navbar.css";
import { SiPeerlist } from "react-icons/si";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaRegistered } from "react-icons/fa";
import { IoLogInSharp } from "react-icons/io5";

const Navbar = ({ active, setActive }) => {
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <SiPeerlist />
      </div>
      <div className="navbar-right">
        <Link to={"/"}>
          <a
            href=""
            className={active === "/" ? "active" : ""}
            onClick={() => setActive("/")}
          >
            <IoHomeSharp />
            Home
          </a>{" "}
        </Link>
        <Link to={"/signup"}>
          <a
            href=""
            className={active === "signup" ? "active" : ""}
            onClick={() => setActive("signup")}
          >
            <FaRegistered /> Sign up
          </a>
        </Link>
        <Link to={"/login"}>
          <a
            href=""
            className={active === "login" ? "active" : ""}
            onClick={() => {
              setActive("login");
              
            }}
          >
            <IoLogInSharp />
            Login
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
