import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TrainService from "../Service/TrainService";
import Swal from "sweetalert2";

const TrainForm = () => {
  const [id, setId] = useState("");
  const [trainName, setTrainName] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState(0);

  const { trainId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (trainId) {
      TrainService.getTrainById(trainId).then((response) => {
        setId(response.id);
        setTrainName(response.trainName);
        setNote(response.note);
        setStatus(response.status);
        console.log(response);
      });
    }
  }, []);

  const submitTrain = (e) => {
    e.preventDefault();
    const train = { id, trainName, status, note };

    if (trainId) {
      TrainService.updateTrain(train).then((response) => {
        Swal.fire("Success", "Train Updated Successfully", "success");
        navigate("/trainTable");
      });
    } else {
      TrainService.createTrain(train)
        .then((response) => {
          Swal.fire("Success", "Train Added Successfully", "success");
          navigate("/trainTable");
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
      <div className="row">
        <div
          class="card  text-bg-white adminNotice-table mb-3 shadow-lg text-center col-sm-6 mx-auto"
          style={{ borderRadius: 30, marginTop: -125 }}
        >
          <div class="card-body">
            <h2 class="card-title mt-1">Add Train</h2>
            <form onSubmit={submitTrain}>
              <div>
                <div className="row col-sm-8   mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -9 }}
                    className="col-sm-3 col-form-label"
                  >
                    Train Name
                  </strong>
                  <input
                    name="trainName"
                    style={{ marginLeft: 9 }}
                    className="form-control w-75"
                    placeholder="Add Name..."
                    type="text"
                    value={trainName}
                    minLength="1"
                    onChange={(e) => {
                      setTrainName(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="row col-sm-8 mx-auto mt-3">
                  <strong
                    style={{ marginLeft: -3 }}
                    className="col-sm-3  col-form-label"
                  >
                    Type
                  </strong>

                  <input
                    name="note"
                    style={{ marginLeft: 3 }}
                    className="form-control w-75"
                    placeholder="Add Type."
                    type="text"
                    value={note}
                    minLength="5"
                    onChange={(e) => {
                      setNote(e.target.value);
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

export default TrainForm;
