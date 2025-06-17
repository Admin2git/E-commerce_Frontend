import React from "react";
import { Link } from "react-router-dom";
import UseCateContext from "../contexts/CategoryContext";
import { Header } from "../components/Header";

const PlaceOrderSuccess = () => {
  const { orderData, totalItems } = UseCateContext();

  console.log(orderData);

  if (!orderData) {
    return <p>Loading order details...</p>;
  }

  return (
    <>
      <Header />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-header text-center">
                <h3>Order Placed Successfully!</h3>
              </div>
              <div className="card-body text-center">
                <p className="text-center">
                  <strong>Thank you for your order!</strong>
                </p>
                <p>
                  Your order has been placed successfully and will be processed
                  soon.
                </p>

                <div className="text-center mt-2">
                  <p>
                    We are processing your order and will notify you once it
                    ships.
                  </p>
                  <Link to="/orderHistory" className="btn btn-primary">
                    View Your Orders
                  </Link>
                  <br />
                  <Link to="/" className="btn btn-secondary my-2">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderSuccess;
