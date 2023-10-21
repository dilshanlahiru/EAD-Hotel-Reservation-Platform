import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div>
        <img
          style={{ height: "300px" }}
          src="https://www.atpi.com/media/cache/picture/35a05bdfc8e6aa40d1c9798e355cefdb.webp"
          alt="Hero Image"
          className="img-fluid w-100"
        />
        <h1 className="text-white" style={{ marginTop: -200 }}>
          Back-office Dashboard
        </h1>
      </div>
      <div
        className="w-75 mx-auto  p-5 "
        style={{ borderRadius: 30, marginTop: -20 }}
      >
        <div className=" card border shadow-lg ">
          <div class="py-5">
            <div class="container">
              <div class="row mx-auto ">
                <div class="col-md-3 mx-auto">
                  <div
                    style={{ height: 190 }}
                    class="card text-center shadow-lg"
                  >
                    <div class="card-block">
                      <img
                        style={{ height: 130, width: 130 }}
                        class="card-img-top p-2"
                        src="https://cdn-icons-png.flaticon.com/128/6434/6434951.png"
                        alt="Card image cap"
                      />
                      <h4 class="card-title"></h4>
                      <Link className="btn btn-primary" to={"/travellearTable"}>
                        Traverler Management
                      </Link>
                    </div>
                  </div>
                </div>

                <div class="col-md-3 mx-auto">
                  <div
                    style={{ height: 190 }}
                    class="card text-center shadow-lg"
                  >
                    <div class="card-block">
                      <img
                        style={{ height: 130, width: 130 }}
                        class="card-img-top p-2"
                        src="https://cdn-icons-png.flaticon.com/128/9249/9249430.png"
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

                <div class="col-md-3 mx-auto ">
                  <div
                    style={{ height: 190 }}
                    class="card text-center shadow-lg"
                  >
                    <div class="card-block">
                      <img
                        style={{ height: 130, width: 130 }}
                        class="card-img-top"
                        src="https://cdn-icons-png.flaticon.com/512/476/476863.png"
                        alt="Card image cap"
                      />
                      {/* <h4 class="card-title"></h4> */}
                      <Link className="btn btn-primary" to={"/userTable"}>
                        User Management
                      </Link>
                    </div>
                  </div>
                </div>

                <div class="col-md-3 mx-auto ">
                  <div
                    style={{ height: 190 }}
                    class="card text-center shadow-lg"
                  >
                    <div class="card-block">
                      <img
                        style={{ height: 130, width: 130 }}
                        class="card-img-top p-2"
                        src="https://cdn-icons-png.flaticon.com/128/3267/3267449.png"
                        alt="Card image cap"
                      />
                      {/* <h4 class="card-title"></h4> */}
                      <Link className="btn btn-primary" to={"/trainTable"}>
                        Train Management
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

export default Home;
