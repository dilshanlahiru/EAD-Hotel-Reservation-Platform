import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import Swal from "sweetalert2";
import ResavationService from "../Service/ResavationService";

const TicketBookingTable = () => {
  const [search, setSearch] = useState("");
  const [scheduleList, setScheduleList] = useState([]);
  const [resavationList, setResavationList] = useState([]);

  useEffect(() => {
    ResavationService.getAllResavation().then((data) => {
      setResavationList(data);
      console.log(data);
    });
  }, []);

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
          style={{ height: "300px" }}
          src="https://www.atpi.com/media/cache/picture/35a05bdfc8e6aa40d1c9798e355cefdb.webp"
          alt="Hero Image"
          className="img-fluid w-100"
        />
      </div>
      <div>
        <div className="container p-1 mt-4 mb-4">
          <div className="row ">
            <div
              className="shadow-lg card mx-auto w-100"
              style={{ marginTop: -150 }}
            >
              <h1 className="mt-4">All Resavations</h1>
              <div className=" container d-flex">
                <input
                  type="text"
                  placeholder="Search By Notice"
                  className="form-control mt-3 w-25 me-3"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />

                <input
                  type="date"
                  placeholder="Search By Notice"
                  className="form-control mt-3 w-25"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />

                <Link
                  className="btn btn-primary mt-3 col-md-2"
                  to={"/allSchedules"}
                  style={{ marginLeft: 430 }}
                >
                  Add Booking
                </Link>
              </div>

              <table class="table table-striped mt-3">
                <thead className="table-primary">
                  <tr>
                    <th scope="col">Traveler NIC</th>
                    <th scope="col">Booking DateTime</th>
                    <th scope="col">Seats</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {resavationList
                    ?.filter((value) => {
                      if (search === "") {
                        return value;
                      } else if (
                        //value.id.toString(includes(search))
                        value.travelerNIC
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        value.bookingDateTime
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return value;
                      }
                      return 0;
                    })
                    .map((note) => (
                      <tr key={note.id}>
                        <td>{note.travelerNIC}</td>
                        <td>{formatDateTime(note.bookingDateTime)}</td>
                        <td>{note.seats}</td>
                        <td>
                          <Link
                            className="btn btn-info"
                            to={`/bookingDetails/${note.id}`}
                          >
                            View Details
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
  );
};

export default TicketBookingTable;
