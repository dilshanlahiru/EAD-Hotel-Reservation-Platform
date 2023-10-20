import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import TrainService from "../Service/TrainService";
import Swal from "sweetalert2";
import ScheduleService from "../Service/ScheduleService";

const ViewAllSchedules = () => {
  const [search, setSearch] = useState("");
  const [scheduleList, setScheduleList] = useState([]);
  const [trainName, setTrainName] = useState("");

  const navigate = useNavigate();
  const { trainId } = useParams();

  useEffect(() => {
    ScheduleService.getAllSchedules().then((data) => {
      setScheduleList(data);
      console.log(data);
    });
  }, []);

  const deleteSchedule = (scheduleId) => {
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
          ScheduleService.deleteSchedule(scheduleId)
            .then((res) => {
              setScheduleList(
                scheduleList.filter(
                  (scheduleList) => scheduleList.id !== scheduleId
                )
              );
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

  const formatDateTime = (dateTimeString) => {
    const dateObject = new Date(dateTimeString);

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return dateObject.toLocaleString(undefined, options);
  };

  return (
    <div>
      <div>
        <img
          src="https://www.atpi.com/media/cache/picture/35a05bdfc8e6aa40d1c9798e355cefdb.webp"
          alt="Hero Image"
          className="img-fluid w-100"
        />
      </div>

      <div>
        <div>
          <div className="container p-1 mb-4" style={{ marginTop: -400 }}>
            <div className="row ">
              <div className="shadow-lg card mx-auto w-100">
                <h1 className="mt-3"> Train Schedules</h1>
                <div className=" container d-flex flex-row">
                  <input
                    type="text"
                    placeholder="Search By Train Name"
                    className="form-control mt-3 w-25 me-3"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />

                  <input
                    type="date"
                    placeholder="Search By Notice"
                    className="form-control mt-3 w-25 "
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
                <table class="table table-striped mt-3">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col">Start</th>
                      <th scope="col">Start Time</th>
                      <th scope="col">End</th>
                      <th scope="col">End Time</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleList
                      ?.filter((value) => {
                        if (search === "") {
                          return value;
                        } else if (
                          //value.id.toString(includes(search))
                          value.start
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          value.destination
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          value.startDateTime
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          value.destinationDateTime
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return value;
                        }
                        return 0;
                      })
                      .map((t) => (
                        <tr key={t.id}>
                          <td>{t.start}</td>
                          <td>{formatDateTime(t.startDateTime)}</td>
                          <td>{t.destination}</td>
                          <td>{formatDateTime(t.destinationDateTime)}</td>
                          <td>
                            <Link
                              className="btn btn-success"
                              to={`/ticketForm/${t.id}`}
                            >
                              Book
                            </Link>
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
  );
};

export default ViewAllSchedules;
