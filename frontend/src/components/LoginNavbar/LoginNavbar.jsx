import React from "react";
import "./LoginNavbar.css";
import { SiPeerlist } from "react-icons/si";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaRegistered } from "react-icons/fa";
import { IoLogInSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";

const LoginNavbar = ({ active, setActive,handleLogout }) => {
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
        <Link to={"/"}>
          <a
            href=""
            className={active === "login" ? "active" : ""}
            onClick={() => {
              setActive("/");
              handleLogout();
            }}
          >
            <IoLogOut />
            Logout
          </a>
        </Link>
      </div>
    </div>
  );
};

export default LoginNavbar;
