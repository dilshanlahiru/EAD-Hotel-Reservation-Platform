import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import TrainService from "../Service/TrainService";
import Swal from "sweetalert2";


const ScheduleTable = () => {
  const [search, setSearch] = useState("");
  const [trainList, setTrainList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    TrainService.getAllTrains().then((data) => {
      setTrainList(data);
      console.log(data);
    });
  }, []);


  const deleteTrain = (trainId) => {

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
        TrainService.deleteTrain(trainId)
        .then((res) => {      
          setTrainList(trainList.filter((trainList) => trainList.id !== trainId));
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
        <h1>Trains</h1>

        <div>
          <div className="container p-1 mt-4 mb-4">
            <div className="row ">
              <div className="shadow-lg card mx-auto w-100">
                <div className=" container d-flex flex-row">
                  <Link
                    className="btn btn-primary mt-3 p-2"
                    style={{ width: 190 }}
                    to={"/trainForm"}
                  >
                    Add Train &nbsp;
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
                      <th scope="col">Train Name</th>
                      <th scope="col">Note</th>
                      <th scope="col">Actions</th>  
                    </tr>
                  </thead>
                  <tbody>
            {trainList?.filter((value) => {
              if (search === "") {
                return value;
              } else if (
                //value.id.toString(includes(search))
                value.trainName.toLowerCase().includes(search.toLowerCase()) ) 
                {
                  return value;
                }
              return 0;
            }).map((t) => (
              <tr key={t.id}>
                <td>{t.trainName}</td>
                <td>{t.note}</td>
                <td>
                  <Link
                    className="btn btn-primary"
                    to={`/scheduleTable/${t.id}`}
                  >
                    Schedules &nbsp;
                    <i class="fa fa-cog" aria-hidden="true"></i>
                  </Link>
                
                  <Link
                    className="btn btn-warning"
                    to={`/trainForm/${t.id}`}
                  >
                    Update &nbsp;
                    <i class="fa fa-cog" aria-hidden="true"></i>
                  </Link>
                
                  <button
                    type="button"
                    onClick={() => deleteTrain(t.id)}
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
