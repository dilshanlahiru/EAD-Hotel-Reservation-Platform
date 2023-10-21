import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ScheduleService from "../Service/ScheduleService";
import ResavationService from "../Service/ResavationService";

const ViewBookingDetails = () => {
  const [id, setId] = useState("");
  const [travelerNIC, setTravelerNIC] = useState("");
  const [bookingDateTime, setBookingDateTime] = useState("");
  const [seats, setSeats] = useState(0);

  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [destinationDateTime, setDestinationDateTime] = useState("");
  const [status, setStatus] = useState(0);
  const [trainName, setTrainName] = useState("");

  const { resId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (resId) {
      ResavationService.getReservationById(resId).then((response) => {
        setId(response.id);
        setTravelerNIC(response.travelerNIC);
        setBookingDateTime(response.bookingDateTime);
        setSeats(response.seats);
        setStart(response.schedule.start);
        setStartDateTime(response.schedule.startDateTime);
        setDestination(response.schedule.destination);
        setDestinationDateTime(response.schedule.destinationDateTime);
        setTrainName(response.schedule.trainName);
        console.log(response);
      });
    }
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

  console.log(id);
  console.log(travelerNIC);
  console.log(bookingDateTime);
  console.log(seats);
  console.log(start);
  console.log(destination);
  console.log(startDateTime);
  console.log(destinationDateTime);
  console.log(status);
  console.log(trainName);

  const deleteResavation = (revationId) => {
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
          ResavationService.deleteResavation(revationId)
            .then((res) => {
              navigate("ticketBookingTable");
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
      <div className="row">
        <div
          class="card text-bg-white adminNotice-table mb-3 mx-auto text-center shadow-lg"
          style={{
            maxWidth: 900,
            borderRadius: 30,
            marginTop: -185,
          }}
        >
          <div class="card-body">
            <h2 class="card-title mt-1">Booking Details</h2>

            <div>
              <div className="col-sm-8 row  mx-auto mt-3">
                <strong
                  style={{ marginLeft: -9 }}
                  className="col-sm-3 col-form-label"
                >
                  Traveler's NIC :
                </strong>
                <div
                  style={{ marginLeft: -9 }}
                  className="col-sm-3  col-form-label"
                >
                  {travelerNIC}
                </div>
              </div>

              <div className="col-sm-8 row  mx-auto mt-3">
                <strong
                  style={{ marginLeft: -9 }}
                  className="col-sm-5 col-form-label"
                >
                  Booking Date and Time :
                </strong>
                <div
                  style={{ marginLeft: -9 }}
                  className="col-sm-5  col-form-label"
                >
                  {formatDateTime(bookingDateTime)}  
                </div>
              </div>

              <div className="col-sm-8 row  mx-auto mt-3">
                <strong
                  style={{ marginLeft: -9 }}
                  className="col-sm-5 col-form-label"
                >
                  Seats :
                </strong>
                <div
                  style={{ marginLeft: -9 }}
                  className="col-sm-5  col-form-label"
                >
                  {seats}
                </div>
              </div>

              <div className="col-sm-8 row  mx-auto mt-3">
                <strong
                  style={{ marginLeft: -9 }}
                  className="col-sm-5 col-form-label"
                >
                  Start :
                </strong>
                <div
                  style={{ marginLeft: -9 }}
                  className="col-sm-5  col-form-label"
                >
                  {start}
                </div>
              </div>

              <div className="col-sm-8 row  mx-auto mt-3">
                <strong
                  style={{ marginLeft: -9 }}
                  className="col-sm-5 col-form-label"
                >
                  Start Date and Time :
                </strong>
                <div
                  style={{ marginLeft: -9 }}
                  className="col-sm-5  col-form-label"
                >
                  {formatDateTime(startDateTime)}
                </div>
              </div>

              <div className="col-sm-8 row  mx-auto mt-3">
                <strong
                  style={{ marginLeft: -9 }}
                  className="col-sm-5 col-form-label"
                >
                  Destination :
                </strong>
                <div
                  style={{ marginLeft: -9 }}
                  className="col-sm-5  col-form-label"
                >
                  {destination}
                </div>
              </div>

              <div className="col-sm-8 row  mx-auto mt-3">
                <strong
                  style={{ marginLeft: -9 }}
                  className="col-sm-5 col-form-label"
                >
                  Arrival Date and Time :
                </strong>
                <div
                  style={{ marginLeft: -9 }}
                  className="col-sm-5  col-form-label"
                >
                  {formatDateTime(destinationDateTime)}
                </div>
              </div>

              {/* <div className="col-sm-8 row  mx-auto mt-3">
                <strong
                  style={{ marginLeft: -9 }}
                  className="col-sm-5 col-form-label"
                >
                  Status :
                </strong>
                <div
                  style={{ marginLeft: -9 }}
                  className="col-sm-5  col-form-label"
                >
                  {status}
                </div>
              </div> */}

              <div className="col-sm-8 row  mx-auto mt-3">
                <strong
                  style={{ marginLeft: -9 }}
                  className="col-sm-5 col-form-label"
                >
                  Train Name :
                </strong>{" "}
                <div
                  style={{ marginLeft: -9 }}
                  className="col-sm-5  col-form-label"
                >
                  {trainName}
                </div>
              </div>

              <div
                className="row w-50 mx-auto mt-3 mb-4 "
                style={{ borderRadius: 30 }}
              >
                <Link
                  className="btn btn-primary"
                  to={`/updateResavation/${id}`}
                >
                  update
                </Link>
                <button
                  type="button"
                  onClick={() => deleteResavation(id)}
                  class="btn btn-danger mt-3"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="p-3">
    //   <div className=" boxnotice card text-center p-3 mt-1">
    //     <h1>Booking Details</h1>
    //     {travelerNIC}
    //     {bookingDateTime}
    //     {seats}
    //     {start}
    //     {destination}
    //     {startDateTime}
    //     {destinationDateTime}
    //     {status}
    //     {trainName}

    // <Link className="btn btn-primary" to={`/updateResavation/${id}`}>
    //   update &nbsp;
    //   <i class="fa fa-cog" aria-hidden="true"></i>
    // </Link>
    // <button
    //   type="button"
    //   onClick={() => deleteResavation(id)}
    //   class="btn btn-danger"
    // >
    //   {" "}
    //   Delete &nbsp;
    //   <i class="fa fa-trash" aria-hidden="true"></i>
    // </button>
    //   </div>
    // </div>
  );
};

export default ViewBookingDetails;
