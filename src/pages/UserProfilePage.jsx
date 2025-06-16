import { Header } from "../components/Header";
import { Link } from "react-router-dom";

export const UserProfilePage = () => {
  const user = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    address: {
      street: "123 Maple Street",
      city: "Toronto",
      state: "Ontario",
      postalCode: "M5A 1A1",
      country: "Canada",
    },
  };

  return (
    <>
      <Header />

      <div className="container mt-5">
        <div className="card shadow-sm p-4">
          <h4 className="mb-4">User Profile</h4>

          <div className="mb-3">
            <strong>Full Name:</strong> <span>{user.fullName}</span>
          </div>

          <div className="mb-3">
            <strong>Email:</strong> <span>{user.email}</span>
          </div>

          <div className="mb-3">
            <strong>Phone:</strong> <span>{user.phone}</span>
          </div>

          <div className="mb-4">
            <strong>Address:</strong>
            <div className="ms-3">
              <address className="mb-0">
                {user.address.street},<br />
                {user.address.city}, {user.address.state} -{" "}
                {user.address.postalCode}
                <br />
                {user.address.country}
              </address>
            </div>
          </div>

          <div className="container mt-4">
            <div className="row">
              {/* Orders Section */}
              <div className=" col-md-6 mb-3">
                <Link to="/orderHistory" style={{ textDecoration: "none" }}>
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-box fs-4 text-primary me-4"></i>
                        <div>
                          <h5 className="card-title">Your Orders</h5>
                          <p className="card-text">
                            Track, return, or buy things again
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Addresses Section */}
              <div className=" col-md-6 col-12  mb-3">
                <Link to="/addresses" style={{ textDecoration: "none" }}>
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-geo-alt fs-4 me-4"></i>

                        <div>
                          <h5 className="card-title">Your Addresses</h5>
                          <p className="card-text">
                            Edit addresses for orders and gifts
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
