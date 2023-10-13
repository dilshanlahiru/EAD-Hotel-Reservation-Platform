import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import UserService from "./Service/UserService";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const submitClicked = (e) => {
    e.preventDefault();
    const loginTemplate = {email, password};

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
      <div class="boxlog mt-5">
        <h1>Sign In</h1>

        <form
           onSubmit={submitClicked}
        >
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
      </div>
    </div>
  );
};

export default LoginForm;
