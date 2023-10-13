import React from "react";

const LoginForm = () => {
  return (
    <div>
      <div class="boxlog mt-5">
        <h1>Sign In</h1>

        <form
        //    onSubmit={submitClicked}
        >
          <div class="inputlog">
            <input
              type="text"
              name="email"
              placeholder="Registration number"
              // onChange={(e) => {
              //   setregNumber(e.target.value);
              // }}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              // onChange={(e) => {
              //   setpassword(e.target.value);
              // }}
              required
            />
          </div>

          <input type="submit" value="Sign in" className="sub " />
        </form>

        <p>
          Don't have an accunt? <a href="/user/-1"> Create Account</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
