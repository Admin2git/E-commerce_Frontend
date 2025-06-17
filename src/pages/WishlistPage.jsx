import UseCateContext from "../contexts/CategoryContext";
import { Header } from "../components/Header";
import toast from "react-hot-toast";

export const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCart } = UseCateContext();

  return (
    <>
      <Header />
      <div className="container py-5 bg-light min-vh-100">
        <h3 className="text-center mb-4 fw-bold">My Wishlist</h3>
        <div className="row ">
          {wishlist.length === 0 ? (
            <p>Your WishlistPage is empty</p>
          ) : (
            wishlist.map((item) => (
              <div className="col-md-3 col-sm-6 mb-4" key={item.id}>
                <div className="card shadow-sm position-relative h-100">
                  {/* Heart Icon */}
                  <button
                    className="btn btn-light position-absolute top-0 end-0 m-2"
                    style={{ borderRadius: "50%" }}
                    onClick={() => {
                      removeFromWishlist(item._id);
                      toast.success("Removed from Wishlist");
                    }}
                  >
                    <i className="bi bi-heart-fill text-danger"></i>
                  </button>

                  {/* Image */}
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.name}
                    style={{
                      height: "300px",
                      width: "auto",
                      objectFit: "cover",
                    }}
                  />

                  {/* Details */}
                  <div className="card-body text-center">
                    <h6 className="card-title">{item.name}</h6>
                    <p className="fw-bold">₹{item.price}</p>
                  </div>

                  {/* Move to Cart Button */}
                  <div className="card-footer text-center bg-secondary">
                    <button
                      className="btn text-white w-100"
                      onClick={() => {
                        addToCart(item);
                        removeFromWishlist(item._id);
                      }}
                    >
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
