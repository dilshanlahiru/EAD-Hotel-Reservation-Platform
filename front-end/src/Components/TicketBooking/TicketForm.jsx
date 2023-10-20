import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScheduleService from "../Service/ScheduleService";
import ResavationService from "../Service/ResavationService";
import Swal from "sweetalert2";

const TicketForm = () => {
  const [id, setId] = useState("");
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [destinationDateTime, setDestinationDateTime] = useState("");
  const [status, setStatus] = useState(0);
  const [trainName, setTrainName] = useState("");
  const [travelerNIC, setTravelerNIC] = useState("");
  const [seats, setSeats] = useState(0);

  const [bookingDateTime, setBookingDateTime] = useState("");
  const [rscheduleId, setRScheduleId] = useState("");

  const { scheduleId } = useParams();
  const { resId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (scheduleId) {
      ScheduleService.getSchduleById(scheduleId).then((response) => {
        setStart(response.start);
        setStartDateTime(response.startDateTime);
        setDestination(response.destination);
        setDestinationDateTime(response.destinationDateTime);
        setTrainName(response.trainName);
        console.log(response);
      });
    }

    if (resId) {
      ResavationService.getReservationById(resId).then((response) => {
        setId(response.id)
        setTravelerNIC(response.travelerNIC)
        setBookingDateTime(response.bookingDateTime)
        setSeats(response.seats)
        setStart(response.schedule.start);
        setStartDateTime(response.schedule.startDateTime);
        setDestination(response.schedule.destination);
        setDestinationDateTime(response.schedule.destinationDateTime);
        setTrainName(response.schedule.trainName)
        setRScheduleId(response.scheduleId)
        console.log(response);
      });
    }
  }, []);

  console.log("scheduleId",scheduleId);
  console.log("resId", resId);

  const submitBooking = (e) => {
    e.preventDefault();

   

    if (resId) {
      const booking = {id, scheduleId : rscheduleId, travelerNIC, status, seats};

      ResavationService.updateReservation(booking).then((response) => {
        Swal.fire("Success", "Updated Successfully", "success");
        navigate("/ticketBookingTable");
      });
    } else if(scheduleId) {
      const booking = {id, scheduleId, travelerNIC, status, seats};
      ResavationService.createResavation(booking)
        .then((response) => {
          Swal.fire("Success", "Added Successfully", "success");
          navigate("/ticketBookingTable");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  

  return (
    <div>
      <div className="row">
        <div
          class="card  mx-auto mt-5"
          style={{ maxWidth: 900, marginLeft: 180, borderRadius: 30 }}
        >
          <div class="card-body">
            <h2 class="card-title mt-1">Booking</h2>
            <form
               onSubmit={submitBooking}
            >
              <div>
                  train name = {trainName}
                  start = {start}
                  start dateTime = {startDateTime}
                  end  = {destination}
                  end date = {destinationDateTime}


                
                
                <div className="row w-50  mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3  col-form-label"
                  >
                    NIC
                  </strong>
                  <input
                    name="topic"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="Add Topic..."
                    type="text"
                      value={travelerNIC}
                      minLength="5"
                      onChange={(e) => {
                        setTravelerNIC(e.target.value);
                      }}
                    required
                  />
                </div>

                <div className="row w-50  mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3  col-form-label"
                  >
                    Seats
                  </strong>
                  <input
                    name="topic"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="Add Topic..."
                    type="number"
                      value={seats}
                      minLength="5"
                      onChange={(e) => {
                        setSeats(e.target.value);
                      }}
                    required
                  />
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

export default TicketForm;
