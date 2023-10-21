import React, { useEffect } from "react";
import "../custom.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import UserService from "../Service/UserService";

const TraverlerForm = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nic, setNic] = useState("");
  const [roleString, setRoleString] = useState("2");
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
        setStatus(response.status);
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
        console.log(response);
        Swal.fire("Success", "Updated Successfully", "success");
        navigate("/travellearTable");
      }).catch((error) => {
        //console.log(response);
        console.log("bbb", error.response.data);
        let m = error.response.data
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: m,
        });
      });;
    } else {
      UserService.createUser(user)
        .then((response) => {
          console.log(response);
          Swal.fire("Success", "Added Successfully", "success");
          navigate("/travellearTable");
        })
        .catch((error) => {
          //console.log(response);
          console.log("bbb", error.response.data);
          let m = error.response.data
          Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: m,
          });
        });
    }
  };

  return (
    <div>
      <div className="background-trvelForm">
        <img
          className="background-imageTF"
          src="https://images4.alphacoders.com/150/150168.jpg"
          alt="Background Image"
        />
      </div>
      <div className="centered-text">
        {/* <h1>Travellers Information Tab</h1> */}
      </div>
      <div className="row ">
        <div class="card mx-auto  text-bg-white adminNotice-table mb-3 mt-5 text-center w-50">
          <div class="card-body">
            <h2 class="card-title mt-1">Add Traveler</h2>

            <form onSubmit={submitUser}>
              <div>
                <div className="row mx-auto col-sm-8 mt-3">
                  <strong className="col-sm-3 col-form-label">Name</strong>
                  <input
                    name="name"
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

                {/* {userId ? (<div className="row col-sm-8 mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3 col-form-label"
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
                    readonly
                  />
                </div>) :
                 (<div className="row col-sm-8 mx-auto mt-3">
                 <strong
                   style={{ marginLeft: -9 }}
                   className="col-sm-3 col-form-label"
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
               </div>)} */}

                <div className="row col-sm-8 mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3 col-form-label"
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

                <div className="row mx-auto col-sm-8 mt-3">
                  <strong className="col-sm-3  col-form-label">NIC</strong>
                  <input
                    name="name"
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

                <div className="row col-sm-8 mx-auto mt-3">
                  <strong className="col-sm-3 col-form-label">Password</strong>
                  <input
                    name="name"
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

                <div className="row w-50 mx-auto mt-3 mb-4 ">
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

export default TraverlerForm;
