import React from "react";
import "./custom.css";

const NavBar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-primary">
        <a class="navbar-brand mx-5 text-white" href="#">
          TravelME
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link text-white" href="/backOfficeHome">
                Home <span class="sr-only"></span>
              </a>
            </li>
            <li class="nav-item active">
              <a
                class="nav-link text-white"
                style={{ marginLeft: 1100 }}
                href="#"
              >
                Logout <span class="sr-only"></span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
