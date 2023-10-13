import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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

  // const deleteTrain = (trainId) => {

  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: 'btn btn-success', 
  //       cancelButton: 'btn btn-danger'
  //     },
  //     buttonsStyling: false
  //   })
    
  //   swalWithBootstrapButtons.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'No, cancel!',
  //     reverseButtons: true
  //   }).then((result) => {

  //     if (result.isConfirmed) {
  //       TrainService.deleteTrain(trainId)
  //       .then((res) => {      
  //         setTrainList(trainList.filter((trainList) => trainList.id !== trainId));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });

  //       swalWithBootstrapButtons.fire(
  //         'Deleted!',
  //         'Your file has been deleted.',
  //         'success'
  //       )
  //     } else if (
  //       /* Read more about handling dismissals below */
  //       result.dismiss === Swal.DismissReason.cancel
  //     ) {
  //       swalWithBootstrapButtons.fire(
  //         'Cancelled',
  //         'Delete canceled',
  //         'error'
  //       )
  //     }
  //   })

  // };

  return (
    <div className="p-3">
      <div className=" boxnotice card text-center p-3 mt-1">
        <h1>All Schedules</h1>

        <div>
          <div className="container p-1 mt-4 mb-4">
            <div className="row ">
              <div className="shadow-lg card mx-auto w-100">
                <div className=" container d-flex flex-row">
                  <Link
                    className="btn btn-primary mt-3 p-2"
                    style={{ width: 190 }}
                    to={"/ticketForm"}
                  >
                    Add Booking &nbsp;
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                  </Link>

                  <input
                    type="text"
                    placeholder="Search By Notice"
                    className="form-control
          mt-3 admin-srchbr1"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />

                  <input
                    type="date"
                    placeholder="Search By Notice"
                    className="form-control mt-3 admin-srchbr-date "
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />

                </div>
                <table class="table table-striped mt-3">
                  <thead className="table-primary">
                    <tr>
                      <th scope="col">Traveler NIC</th>
                      <th scope="col">Booking DateTime</th>
                      <th scope="col">Seats</th>
                      <th scope="col">Action</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {resavationList?.filter((value) => {
          if (search === "") {
            return value;
          } else if (
            //value.id.toString(includes(search))
            value.travelerNIC.toLowerCase().includes(search.toLowerCase()) 
          ) {
            return value;
          }
          return 0;
}).map((note) => (
                    <tr key={note.id}>
                      <td>{note.travelerNIC}</td>
                      <td>{note.bookingDateTime}</td>
                      <td>{note.seats}</td>
                      <td>
                        <Link
                          className="btn btn-warning"
                          to={`/AdminHome/NoticeTable/NoticeForm/${note.id}`}
                        >
                          View Schedule &nbsp;
                          <i class="fa fa-cog" aria-hidden="true"></i>
                        </Link>
                      </td>
                      
                      {/* <td>
                        <button
                          type="button"
                          onClick={() => deleteNotice(note._id)}
                          class="btn btn-danger"
                        > Delete &nbsp;
                          <i class="fa fa-trash" aria-hidden="true"></i> 
                          
                        </button>
                      </td>  */}
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

export default TicketBookingTable;
