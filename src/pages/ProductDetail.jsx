import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { Header } from "../components/Header";
import UseCateContext from "../contexts/CategoryContext";
import toast from "react-hot-toast";

export const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const { cart, wishlist, addToWishlist, removeFromWishlist, addToCart } =
    UseCateContext();

  const {
    data: product,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_BASE_API_URL}/products/${productId}`);
  console.log(product);

  const [addedToCart, setAddedToCart] = useState(
    cart?.some((item) => item._id === productId)
  );

  const [addedToWishlist, setAddedToWishlist] = useState(
    wishlist?.some((item) => item._id === productId)
  );
  const navigate = useNavigate();

  const handleClick = () => {
    if (!addedToCart) {
      addToCart(product);
      toast.success("Added to cart");
      setAddedToCart(true);
    } else {
      navigate("/cart");
    }
  };

  if (loading) return <div className="d-flex justify-content-center align-items-center"  style={{ height: '50vh' }}>Loading...</div>;
  if (error)
    return <div className="container pt-4 pb-5 ">Error loading product</div>;

  return product ? (
    <>
      <Header />
      <div className="container bg-body-secondary mt-3 mb-5">
        <div className="row py-4 pb-5">
          {/* Product Image */}
          <div className="col-md-5 col-12 text-center ">
            <div className="position-relative">
              <img
                src={product.image}
                alt="Men Premium Jacket"
                className="img-fluid rounded"
                style={{ height: "500px", width: "auto", objectFit: "cover" }}
              />
            </div>

            <div className="d-flex gap-2 my-3">
              <button className="btn btn-primary w-50" onClick={handleClick}>
                {addedToCart ? (
                  <>
                    Go to Cart  <i className="bi bi-arrow-right"></i>
                  </>
                ) : (
                  "Add to Cart"
                )}
              </button>
              <button
                className={
                  addedToWishlist
                    ? "btn btn-secondary w-50"
                    : "btn btn-outline-secondary w-50"
                }
                onClick={() => {
                  if (!addedToWishlist) {
                    addToWishlist(product);
                    setAddedToWishlist(true);
                  } else {
                    removeFromWishlist(product._id);
                    toast.success("Removed from wishlist 💔");
                    setAddedToWishlist(false);
                  }
                }}
              >
                {addedToWishlist ? "Remove  Wishlisted" : "Save to Wishlist"}
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="col-md-7 col-12">
            <h4 className="ms-3">{product.description}</h4>
            <div className="d-flex align-items-center mt-3 ms-3">
              <span className="me-2 text-warning">★★★★☆</span>
              <span className="text-muted">({product.rating})</span>
            </div>
            <h3 className="mt-3 mx-3">
              ₹{product.price * quantity}
              <span className="text-muted text-decoration-line-through fs-5">
                ₹3999
              </span>
            </h3>
            <p className="text-success fw-bold ms-3">50% off</p>

            <div className="m-4">
              <label className="form-label fw-bold">Quantity:</label>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-dark btn-sm me-2"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span>{quantity >= 1 ? quantity : 1}</span>
                <button
                  className="btn btn-outline-dark btn-sm ms-2"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="m-4">
              <label className="form-label fw-bold me-3">Size:</label>
              <div className="btn-group" role="group">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className={`btn btn-outline-dark ${
                      size === "M" ? "active" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <hr />

            {/* Feature Icons */}
            <div className="row row-cols-2 row-cols-md-4 text-center my-3">
              <div className="col">
                <i className="bi bi-arrow-counterclockwise fs-3"></i>
                <p className="small">10 days Returnable</p>
              </div>
              <div className="col">
                <i className="bi bi-cash-coin fs-3"></i>
                <p className="small">Pay on Delivery</p>
              </div>
              <div className="col">
                <i className="bi bi-truck fs-3"></i>
                <p className="small">Free Delivery</p>
              </div>
              <div className="col">
                <i className="bi bi-shield-lock fs-3"></i>
                <p className="small">Secure Payment</p>
              </div>
            </div>
            <hr />

            {/* Description */}
            <div className="mt-4">
              <h6>Description:</h6>
              <ul className="small">
                <li>
                  <strong>STYLE REDEFINED:</strong> Elevate your look with our
                  versatile Bomber Jacket.
                </li>
                <li>
                  <strong>ALL-WEATHER READY:</strong> Stay comfortable in any
                  weather with its water-resistant build.
                </li>
                <li>
                  <strong>UNPARALLELED COMFORT:</strong> Snug fit with premium
                  materials.
                </li>
                <li>
                  <strong>VERSATILE ESSENTIAL:</strong> Ideal for casual to
                  semi-formal occasions.
                </li>
                <li>
                  <strong>TRAVEL-FRIENDLY:</strong> Lightweight, easy to pack —
                  your travel companion for style on the go.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p className="d-flex justify-content-center align-items-center"  style={{ height: '50vh' }}>Loading...</p>
  );
};
