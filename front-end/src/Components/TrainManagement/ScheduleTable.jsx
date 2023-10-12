import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import TrainService from "../Service/TrainService";
import Swal from "sweetalert2";
import ScheduleService from "../Service/ScheduleService";


const ScheduleTable = () => {
  const [search, setSearch] = useState("");
  const [scheduleList, setScheduleList] = useState([]);
  const [trainName, setTrainName] = useState("");

  const navigate = useNavigate();
  const { trainId } = useParams();

  useEffect(() => {
    if(trainId){
      TrainService.getTrainById(trainId).then((response) => {
        setTrainName(response.trainName)
        console.log(response);
      });
      ScheduleService.getSchduleByTrainId(trainId).then((data) => {
        setScheduleList(data);
        console.log(data);
      });
    }
    
  }, []);

  console.log("trainDetails", trainName);


  const deleteSchedule = (scheduleId) => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success', 
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {

      if (result.isConfirmed) {
        ScheduleService.deleteSchedule(scheduleId)
        .then((res) => {      
          setScheduleList(scheduleList.filter((scheduleList) => scheduleList.id !== scheduleId));
        })
        .catch((error) => {
          console.log(error);
        });

        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Delete canceled',
          'error'
        )
      }
    })

  };


  return (
    <div className="p-3">
      <div className=" boxnotice card text-center p-3 mt-1">
        <h1> {trainName} Train Schedule</h1>

        <div>
          <div className="container p-1 mt-4 mb-4">
            <div className="row ">
              <div className="shadow-lg card mx-auto w-100">
                <div className=" container d-flex flex-row">
                  <Link
                    className="btn btn-primary mt-3 p-2"
                    style={{ width: 190 }}
                    to={`/scheduleForm/${trainId}`}
                  >
                    Add Schedule &nbsp;
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                  </Link>

                  <input
                    type="text"
                    placeholder="Search By Train Name"
                    className="form-control mt-3 admin-srchbr1"
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
            {scheduleList?.filter((value) => {
              if (search === "") {
                return value;
              } else if (
                //value.id.toString(includes(search))
                value.start.toLowerCase().includes(search.toLowerCase()) ) 
                {
                  return value;
                }
              return 0;
            }).map((t) => (
              <tr key={t.id}>
                <td>{t.start}</td>
                <td>{t.startDateTime}</td>
                <td>{t.destination}</td>
                <td>{t.destinationDateTime}</td>
                <td>
                  <Link
                    className="btn btn-warning"
                    to={`/scheduleForm/${trainId}/${t.id}`}
                  >
                    Update &nbsp;
                    <i class="fa fa-cog" aria-hidden="true"></i>
                  </Link>
                
                  <button
                    type="button"
                    onClick={() => deleteSchedule(t.id)}
                    class="btn btn-danger"
                  > Delete &nbsp;
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
  );
};

export default ScheduleTable;
