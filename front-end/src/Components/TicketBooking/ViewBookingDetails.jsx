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
        setId(response.id)
        setTravelerNIC(response.travelerNIC)
        setBookingDateTime(response.bookingDateTime)
        setSeats(response.seats)
        setStart(response.schedule.start);
        setStartDateTime(response.schedule.startDateTime);
        setDestination(response.schedule.destination);
        setDestinationDateTime(response.schedule.destinationDateTime);
        setTrainName(response.schedule.trainName)
        console.log(response);
      });
    }
  }, []);


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
        ResavationService.deleteResavation(revationId)
        .then((res) => {      
          navigate("ticketBookingTable");
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
        <h1>Booking Details</h1>

        {/* <div>
          <div className="container p-1 mt-4 mb-4">
            <div className="row ">
              <div className="shadow-lg card mx-auto w-100">
                <div className=" container d-flex flex-row">
                  

            
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
        </div> */}
         <Link
                    className="btn btn-primary"
                    to={`/ticketForm/${id}`}
                  >
                    update &nbsp;
                    <i class="fa fa-cog" aria-hidden="true"></i>
                  </Link>
          <button
                    type="button"
                    onClick={() => deleteResavation(id)}
                    class="btn btn-danger"
                  > Delete &nbsp;
                    <i class="fa fa-trash" aria-hidden="true"></i> 
                    
          </button>

          

      </div>
    </div>
  );
};

export default ViewBookingDetails;
