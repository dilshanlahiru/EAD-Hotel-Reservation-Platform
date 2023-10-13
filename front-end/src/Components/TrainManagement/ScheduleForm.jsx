import React, { useEffect } from "react";
import { useState } from "react";
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
        setId(response.id)
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

    const train = {id, trainId, trainName, start, startDateTime, destination, destinationDateTime, status};

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
  
  //console.log("data", (new Date("2023-10-11T18:50:57.742Z"), 'MMMM do yyyy, h:mm:ss a'));

//   let date = new Date("2023-10-11T21:10:48.378Z");
// /* Date format you have */
// let dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
// /* Date converted to MM-DD-YYYY format */
// console.log("d1", date)
// console.log("d2", dateMDY)

console.log("d1", startDateTime)
console.log("d2", destinationDateTime)

  return (
    <div>
      <div className="row">
        <div
          class="card  text-bg-white adminNotice-table mb-3 mt-5 text-center"
          style={{ maxWidth: 900, marginLeft: 180, borderRadius: 30 }}
        >
          <div class="card-body">
            <h2 class="card-title mt-1">Add Schedule</h2>
            <form onSubmit={submitTrain}>
              <div>
                
                <div className="row w-50  mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3  col-form-label"
                  >
                    Start
                  </strong>
                  <input
                    name="trainName"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="Add Name..."
                    type="text"
                    value={start}
                    minLength="1"
                    onChange={(e) => {
                      setStart(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row w-50  mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3 col-form-label"
                  >
                    Start DateTime
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

                <div className="row w-50  mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -3 }}
                    className="col-sm-3  col-form-label"
                  >
                    End
                  </strong>

                  <textarea
                    name="note"
                    style={{ marginLeft: 3 }}
                    className="form-control w-75"
                    placeholder="Add notice...."
                    type="text"
                    value={destination}
                    minLength="5"
                    onChange={(e) => {
                      setDestination(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row w-50  mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3 col-form-label"
                  >
                    End DateTime
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

export default ScheduleForm;
