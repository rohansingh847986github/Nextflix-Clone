import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { logout } from "../../firebase";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current?.classList.add("nav-dark");
      } else {
        navRef.current?.classList.remove("nav-dark");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav ref={navRef} className="navbar">
      <div className="navbar-left">
        <NavLink to="/">
          <img src={logo} alt="Netflix" className="logo" />
        </NavLink>

        <ul className={menuOpen ? "active" : ""}>
          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/tvshows" onClick={() => setMenuOpen(false)}>
              TV Shows
            </NavLink>
          </li>

          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Movies
            </NavLink>
          </li>

          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              New & Popular
            </NavLink>
          </li>

          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              My List
            </NavLink>
          </li>

          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Browse by Languages
            </NavLink>
          </li>
        </ul>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>

      <div className="navbar-right">
        <img src={search_icon} alt="Search" className="icons" />

        <p className="children">Children</p>

        <img src={bell_icon} alt="Notifications" className="icons" />

        <div className="navbar-profile">
          <img src={profile_img} alt="Profile" className="profile" />
          <img src={caret_icon} alt="Menu" />

          <div className="dropdown">
            <p onClick={logout}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
