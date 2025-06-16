import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import UseCateContext from "../contexts/CategoryContext";

export const ProductCard = ({
  name,
  price,
  product,
  image,
  rating,
  id,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
}) => {
  const { cart, wishlist } = UseCateContext();
  const [addedToCart, setAddedToCart] = useState(
    cart?.some((item) => item._id === product._id)
  );

  const [addedToWishlist, setAddedToWishlist] = useState(
    wishlist?.some((item) => item._id === product._id)
  );
  const navigate = useNavigate();

  const handleClick = () => {
    if (!addedToCart) {
      onAddToCart(product);
      setAddedToCart(true);
    } else {
      navigate("/cart");
    }
  };
  return (
    <div className="">
      <div className="card">
        <Link to={`/product/${id}`}>
          <img
            src={image}
            className="card-img-top"
            alt={name}
            style={{ height: "300px", objectFit: "cover" }}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center">{name}</h5>
          <div className="card-text d-flex justify-content-between align-items-center">
            <p className="text-danger">₹{price}</p>
            <p>Rating: {rating}⭐</p>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" onClick={handleClick}>
              {addedToCart ? (
                <>
                  Go to Cart <i className="bi bi-arrow-right"></i>
                </>
              ) : (
                "Add to Cart"
              )}
            </button>
            <button
              className={
                addedToWishlist
                  ? "btn btn-secondary"
                  : "btn btn-outline-secondary"
              }
              onClick={() => {
                if (!addedToWishlist) {
                  onAddToWishlist(product);
                  setAddedToWishlist(true);
                } else {
                  onRemoveFromWishlist(product._id);
                  toast.success("Removed from wishlist 💔");
                  setAddedToWishlist(false);
                }
              }}
            >
              {addedToWishlist ? "Remove  Wishlisted" : "Save to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
