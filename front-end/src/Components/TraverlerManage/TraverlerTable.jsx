import React from "react";
import "../custom.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserService from "../Service/UserService";
import Swal from "sweetalert2";

const TraverlerTable = () => {
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getAllTravelerUsers().then((data) => {
      setUserList(data);
      console.log(data);
    });
  }, []);

  const deleteUser = (uId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          UserService.deleteUserById(uId)
            .then((res) => {
              setUserList(userList.filter((userList) => userList.id !== uId));
            })
            .catch((error) => {
              console.log(error);
            });

          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Delete canceled",
            "error"
          );
        }
      });
  };

  const changeStatus = (userId, status) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (status == 0) {
            UserService.updateStatus(userId, 1)
              .then((res) => {
                setUserList(
                  userList.filter((userList) => userList.id !== userId)
                );
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            UserService.updateStatus(userId, 0)
              .then((res) => {
                setUserList(
                  userList.filter((userList) => userList.id !== userId)
                );
              })
              .catch((error) => {
                console.log(error);
              });
          }
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Delete canceled",
            "error"
          );
        }
      });
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
        <h1>Travellers Information Tab</h1>
      </div>

      <div className="p-3">
        <div className="text-center p-3 mt-1">
          <div>
            <div className="container p-1 mt-4 mb-4">
              <div className="row ">
                <div className="shadow-lg card mx-auto w-100">
                  <div className=" container d-flex flex-row">
                    <input
                      type="text"
                      placeholder="Search By Name Or Email"
                      className="form-control mt-3 w-50 mx-1"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    <Link
                      className="btn btn-primary mt-3 p-2 "
                      style={{ width: 190, marginLeft: 440 }}
                      to={"/travelerForm"}
                    >
                      Add User &nbsp;
                      <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    </Link>
                  </div>
                  <table class="table table-striped mt-3">
                    <thead className="table-primary">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Nic</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList
                        ?.filter((value) => {
                          if (search === "") {
                            return value;
                          } else if (
                            //value.id.toString(includes(search))
                            value.name
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                            value.email
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                            value.nic
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            return value;
                          }
                          return 0;
                        })
                        .map((u) => (
                          <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.nic}</td>
                            <td>{u.status == 0 ? "Active" : "Deactivate"}</td>
                            <td className="d-flex justify-content-around">
                              <Link
                                className="btn btn-warning"
                                to={`/travelerForm/${u.id}`}
                              >
                                Update
                                <i class="fa fa-cog" aria-hidden="true"></i>
                              </Link>

                              <button
                                type="button"
                                onClick={() => changeStatus(u.id, u.status)}
                                class="btn btn-info"
                              >
                                {" "}
                                Change Status &nbsp;
                                <i class="fa fa-trash" aria-hidden="true"></i>
                              </button>

                              <button
                                type="button"
                                onClick={() => deleteUser(u.id)}
                                class="btn btn-danger"
                              >
                                {" "}
                                Delete &nbsp;
                                <i class="fa fa-trash" aria-hidden="true"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraverlerTable;
