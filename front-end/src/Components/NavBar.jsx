import React from "react";
import "./custom.css";
import { Link, useLocation } from "react-router-dom"; // Import useLocation

const NavBar = () => {
  const location = useLocation();
  return (
    <div>
      <div
        class="navbar navbar-expand-lg bg-primary "
        // style={{ backgroundColor: "#3ed40f" }}
      >
        <div class="container-fluid text-white">
          <a class="navbar-brand text-white" href="#">
            Navbar w/ text
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="/backOfficeHome"
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Features
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Pricing
                </a>
              </li>
            </ul>
            {location.pathname !== "/" && (
              <ul className="navbar-nav me-3 mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    LogOut
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
