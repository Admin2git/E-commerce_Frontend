import { Header } from "../components/Header";
import UseCateContext from "../contexts/CategoryContext";
import toast from "react-hot-toast";
import { CheckoutPage } from "./CheckoutPage";
import { Link } from "react-router-dom";

export const CartPage = () => {
  const { cart, updateCartQuantity, removeFromCart, addToWishlist } =
    UseCateContext();
  console.log(cart);

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const deliveryCharges = subtotal > 0 ? 499 : 0;
  const totalAmount = subtotal + deliveryCharges;

  return (
    <>
      <Header />
      <div className="container bg-light py-4">
        <h5 className="fw-bold text-center mb-4">MY CART ({cart.length})</h5>
        {cart.length === 0 ? (
          <p className="text-center mt-5">Your cart is empty</p>
        ) : (
          <div className="row d-flex justify-content-between ">
            <div className="col-md-7 col-12 justify-content-center">
              {cart.map((item) => (
                <div key={item._id} className="mb-3">
                  <div className="d-flex flex-column flex-md-row gap-4 bg-white p-3 rounded shadow-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid"
                      style={{ maxWidth: "200px", objectFit: "cover" }}
                    />
                    <div className="flex-grow-1">
                      <h6>{item.name}</h6>
                      <p className="mb-1 fw-bold">
                        ₹{item.price}{" "}
                        <span className="text-muted text-decoration-line-through fw-normal">
                          ₹{0}
                        </span>
                      </p>
                      <p className="text-success mb-1">0% off</p>
                      <div className="d-flex align-items-center mb-3">
                        <span className="me-2">Quantity:</span>
                        <button
                          className="btn btn-outline-dark btn-sm me-2"
                          //onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          onClick={() =>
                            updateCartQuantity(item._id, item.quantity - 1)
                          }
                          // disabled={item.quantity <= 1}
                        >
                          {item.quantity <= 1 ? (
                            <i className="bi bi-trash"></i> // Bootstrap icon
                          ) : (
                            "−"
                          )}
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-outline-dark btn-sm ms-2"
                          // onClick={() => setQuantity((q) => q + 1)}
                          onClick={() =>
                            updateCartQuantity(item._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <div className="d-flex flex-column gap-2">
                        <button
                          className="btn btn-secondary w-55"
                          onClick={() => {
                            removeFromCart(item._id);
                            toast.success("Removed from cart");
                          }}
                        >
                          Remove From Cart
                        </button>
                        <button
                          className="btn btn-outline-secondary w-55"
                          onClick={() => {
                            addToWishlist(item);
                           
                          }}
                        >
                          Move to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Right - Price Details */}
            <div className="col-md-4 col-12 mt-4 ">
              <div className="bg-white p-4 rounded shadow-sm">
                <h6 className="fw-bold mb-3">SUBTOTAL PRICE </h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>Price ({totalItems} item)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Discount</span>
                  <span className="text-success">- ₹0</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Charges</span>
                  <span>₹{deliveryCharges}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold mb-3">
                  <span>TOTAL AMOUNT</span>
                  <span>₹ {totalAmount}</span>
                </div>

                <Link className="btn btn-primary w-100" to="/checkoutPage">
                  Process to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
