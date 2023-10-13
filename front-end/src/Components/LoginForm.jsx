import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import UserService from "./Service/UserService";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const submitClicked = (e) => {
    e.preventDefault();
    const loginTemplate = { email, password };

    UserService.login(loginTemplate)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data.role == 0) {
          navigate("/backOfficeHome");
        } else if (res.data.role == 1) {
          navigate("/travelAgenteHome");
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "User Name OR Password In correct!",
        });
        console.log("failed");
      });
  };

  return (
    <div>
      {/* <div class="boxlusog mt-5">
        <h1>Sign In</h1>

        <form onSubmit={submitClicked}>
          <div class="inputlog">
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              required
            />
          </div>

          <input type="submit" value="Sign in" className="sub " />
        </form>

        <p>
          Don't have an accunt? <a href="/userReg"> Create Account</a>
        </p>
      </div> */}

      <div className="container">
        <br />
        <br />
        <br />
        <br />
        <div
          className="card col-md-6 offset-md-3 offset-md-3"
          style={{ borderRadius: 30 }}
        >
          <div className="card-body shadow-lg" style={{ borderRadius: 30 }}>
            <div>
              <center>
                <h1>Login</h1>
              </center>
            </div>

            <form onSubmit={submitClicked}>
              <div className="form-group mt-5 row ">
                <label className="col-sm-4  col-form-label">NIC : </label>
                <div className="col-sm-12 w-50 ">
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="NIC"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <br></br>
              <div className="form-group  row">
                <label className="col-sm-4  col-form-label">Password : </label>
                <div className="col-sm-12  w-50">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <br />
              <div className="text-center">
                <input
                  type="submit"
                  value="Sign in"
                  className="btn btn-primary "
                />
              </div>
              <br />
              <div className="text-center">
                Create An Account{" "}
                <Link to="/userReg" className="text-center">
                  Sign up{" "}
                </Link>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
