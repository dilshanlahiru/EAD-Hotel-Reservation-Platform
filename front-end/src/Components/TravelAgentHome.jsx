import React from "react";
import "./custom.css";
import { Link } from "react-router-dom";
const TravelAgentHome = () => {
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
      <div className="centered-text">
        <h1>Admin Dashboard</h1>
      </div>
      <div
        className="card w-75 mx-auto mt-5 bg-light p-5 shadow-lg"
        style={{ borderRadius: 30 }}
      >
        <div className=" card border shadow-lg ">
          <h2 style={{ borderRadius: 30, textAlign: "center" }}>
            {/* Admin Dashboard */}
          </h2>

          <div class="py-5">
            <div class="container">
              <div class="row mx-auto ">
                {/* <div class="col-md-3 mx-auto">
                <div style={{ height: 190 }} class="card text-center shadow-lg">
                  <div class="card-block">
                    <img
                      style={{ height: 130, width: 130 }}
                      class="card-img-top"
                      src="https://cdn-icons-png.flaticon.com/512/2967/2967357.png"
                      alt="Card image cap"
                    />
                    <h4 class="card-title"></h4>
                    <Link
                      className="btn btn-primary"
                      to={"/travellearTable"}
                    >
                      Traverler Management
                    </Link>
                  </div>
                </div>
              </div> */}

                <div class="col-md-3 mx-auto">
                  <div
                    style={{ height: 190 }}
                    class="card text-center shadow-lg"
                  >
                    <div class="card-block">
                      <img
                        style={{ height: 130, width: 130 }}
                        class="card-img-top"
                        src="https://cdn-icons-png.flaticon.com/512/2641/2641310.png"
                        alt="Card image cap"
                      />
                      <h4 class="card-title"></h4>
                      <Link
                        className="btn btn-primary"
                        to={"/ticketBookingTable"}
                      >
                        Ticket Booking
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <br></br>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelAgentHome;
