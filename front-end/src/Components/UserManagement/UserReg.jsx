import React, { useEffect } from "react";
import "../custom.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import UserService from "../Service/UserService";

const UserReg = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nic, setNic] = useState("");
  const [roleString, setRoleString] = useState("");
  const [status, setStatus] = useState(0);

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      UserService.getUserById(userId).then((response) => {
        setId(response.id);
        setName(response.name);
        setEmail(response.email);
        setNic(response.nic);
        setRoleString(response.role);
        console.log(response);
      });
    }
  }, []);

  const submitUser = (e) => {
    e.preventDefault();
    let role = parseInt(roleString);
    const user = { id, name, email, password, nic, role, status };
    console.log("u", user);

    if (userId) {
      UserService.updateUser(user).then((response) => {
        Swal.fire("Success", "Updated Successfully", "success");
        navigate("/userTable");
      });
    } else {
      UserService.createUser(user)
        .then((response) => {
          Swal.fire("Success", "Added Successfully", "success");
          navigate("/userTable");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div>
        <img
          style={{ height: "300px" }}
          src="https://www.atpi.com/media/cache/picture/35a05bdfc8e6aa40d1c9798e355cefdb.webp"
          alt="Hero Image"
          className="img-fluid w-100"
        />
      </div>
      <div className="centered-text">
        <h1>User Registration Tab</h1>
      </div>
      <div className="row">
        <div
          class="card  text-bg-white adminNotice-table mb-3 mt-5 text-center mx-auto shadow-lg"
          style={{ maxWidth: 900, marginLeft: 180, borderRadius: 30 }}
        >
          <div class="card-body">
            {/* <h2 class="card-title mt-1">Add User</h2> */}
            <form onSubmit={submitUser}>
              <div>
                <div className="row w-50  mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3  col-form-label"
                  >
                    Name
                  </strong>
                  <input
                    name="name"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="Add Name..."
                    type="text"
                    value={name}
                    minLength="5"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row w-50  mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3  col-form-label"
                  >
                    Email
                  </strong>
                  <input
                    name="name"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="Add Email..."
                    type="text"
                    value={email}
                    minLength="5"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row w-50  mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3  col-form-label"
                  >
                    NIC
                  </strong>
                  <input
                    name="name"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="Add NIC..."
                    type="text"
                    value={nic}
                    minLength="5"
                    onChange={(e) => {
                      setNic(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row w-50  mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3  col-form-label"
                  >
                    Password
                  </strong>
                  <input
                    name="name"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="Add Password..."
                    type="text"
                    value={password}
                    minLength="5"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row w-50  mx-auto mt-4 ">
                  <strong className="col-sm-3  col-form-label">Role</strong>

                  <select
                    class="form-select w-75"
                    aria-label="Default select example"
                    value={roleString}
                    required
                    placeholder="SelectFaculty.."
                    onChange={(e) => {
                      setRoleString(e.target.value);
                    }}
                  >
                    <option value="">Select Role </option>
                    <option value="0">Back Office</option>
                    <option value="1">Travel Agent</option>
                  </select>
                </div>

                <div
                  className="row w-50 mx-auto mt-3 mb-4 "
                  style={{ borderRadius: 30 }}
                >
                  <input
                    className="btn btn-primary mt-4 mx-auto shadow-lg"
                    type="submit"
                    value="Save"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReg;
