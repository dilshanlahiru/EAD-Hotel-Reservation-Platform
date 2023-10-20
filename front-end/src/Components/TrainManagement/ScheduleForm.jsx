import React, { useEffect } from "react";
import { useState } from "react";
import "../custom.css";
import { useNavigate, useParams } from "react-router-dom";
import TrainService from "../Service/TrainService";
import Swal from "sweetalert2";
import ScheduleService from "../Service/ScheduleService";

const ScheduleForm = () => {
  const [id, setId] = useState("");
  const [strainId, setSTrainId] = useState("");
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [destinationDateTime, setDestinationDateTime] = useState("");
  const [status, setStatus] = useState(0);
  const [trainName, setTrainName] = useState("");

  const { trainId } = useParams();
  const { scheduleId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (trainId) {
      TrainService.getTrainById(trainId).then((response) => {
        setTrainName(response.trainName);
        console.log(response);
      });
    }
    if (scheduleId) {
      ScheduleService.getSchduleById(scheduleId).then((response) => {
        setId(response.id);
        setStart(response.start);
        setStartDateTime(response.startDateTime);
        setDestination(response.destination);
        setDestinationDateTime(response.destinationDateTime);
        console.log(response);
      });
    }
  }, []);

  const submitTrain = (e) => {
    e.preventDefault();

    const train = {
      id,
      trainId,
      trainName,
      start,
      startDateTime,
      destination,
      destinationDateTime,
      status,
    };

    if (scheduleId) {
      ScheduleService.updateSchedule(train).then((response) => {
        Swal.fire("Success", "Updated Successfully", "success");
        navigate(`/scheduleTable/${trainId}`);
      });
    } else {
      ScheduleService.createSchedule(train)
        .then((response) => {
          Swal.fire("Success", "Train Added Successfully", "success");
          navigate(`/scheduleTable/${trainId}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  console.log("d1", startDateTime);
  console.log("d2", destinationDateTime);

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
          class="card text-bg-white w-50 adminNotice-table mb-5 text-center mx-auto shadow-lg"
          style={{
            maxWidth: 900,
            marginLeft: 180,
            borderRadius: 30,
            marginTop: -130,
          }}
        >
          <div class="card-body">
            <form onSubmit={submitTrain}>
              <div>
                <h1 className="mt-3">Add Train schedule</h1>
                <div className="row col-sm-8 mx-auto mt-4 ">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3  col-form-label"
                  >
                    From
                  </strong>
                  <input
                    name="trainName"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="From..."
                    type="text"
                    value={start}
                    minLength="1"
                    onChange={(e) => {
                      setStart(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row col-sm-8 mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3  col-form-label"
                  >
                    Departure
                  </strong>
                  <input
                    name="dateTime"
                    className="form-control w-75"
                    placeholder="Add Topic..."
                    type="datetime-local"
                    value={startDateTime}
                    onChange={(e) => {
                      setStartDateTime(e.target.value);
                    }}
                    style={{ marginLeft: 9 }}
                    required
                  />
                </div>

                <div className="row col-sm-8 mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -3 }}
                    className="col-sm-3  col-form-label"
                  >
                    To
                  </strong>

                  <input
                    name="note"
                    style={{ marginLeft: 3 }}
                    className="form-control w-75"
                    placeholder="To...."
                    type="text"
                    value={destination}
                    minLength="5"
                    onChange={(e) => {
                      setDestination(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row col-sm-8 mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3 col-form-label"
                  >
                    Arrival
                  </strong>
                  <input
                    name="date"
                    className="form-control w-75"
                    placeholder="Add Topic..."
                    type="datetime-local"
                    value={destinationDateTime}
                    onChange={(e) => {
                      setDestinationDateTime(e.target.value);
                    }}
                    style={{ marginLeft: 9 }}
                    required
                  />
                </div>

                <div
                  className="row w-50 mx-auto mt-3 mb-4 "
                  style={{ Radius: 30 }}
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

export default ScheduleForm;
