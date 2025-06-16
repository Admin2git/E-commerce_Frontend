import { Header } from "../components/Header";
import useFetch from "../useFetch";

export const OrderHistory = () => {
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_BASE_API_URL}/order/place`
  );
  return (
    <>
      <Header />
      <div className="container mb-5">
        <h3 className="display-6 my-3">Your orders</h3>
        {loading && <div>Loading...</div>}
        {error && <div>Error loading addresses</div>}

        {!loading && !error && data?.length === 0 && (
          <p>No saved order found.</p>
        )}

        {data ? (
          data.map((order) => (
            <div key={order._id} className="row mt-4 justify-content-center">
              <div className="col-md-10 col-12">
                <div className="card  mb-3 ">
                  <div className="card-header p-3">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                      {/* Left: Order Details */}

                      <p className="mb-1">
                        <strong>ORDER PLACED</strong>:{" "}
                        {order.createdAt.split("T")[0]}
                      </p>
                      <p className="mb-1">
                        <strong>TOTAL</strong>: ₹ {order.totalPrice}
                      </p>

                      <p>
                        <strong>ORDERED BY</strong>: Akabar
                      </p>

                      {/* Right: Order # and Actions */}
                      <div className="text-end">
                        <p>
                          <strong>ORDER # </strong>
                          {order._id}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product Information */}
                  <div className="card-body">
                    {order.items?.map((item, index) => (
                      <>
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                            <div>
                              <img
                                src={item.productId.image}
                                alt={item.productId.name}
                                className="img-fluid rounded"
                                style={{
                                  height: "120px",
                                  width: "120px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            <p className="ms-4">{item.productId.description}</p>
                          </div>

                          <div className="ms-3 mx-5">
                            <h6 className="mb-3">{item.productId.name}</h6>
                            <h6 className="mb-3">
                              Price: ₹ {item.productId.price}
                            </h6>

                            <h6 className="mb-1">Quantity: {item.quantity}</h6>
                          </div>
                        </div>
                        {index < order.items.length - 1 && <hr />}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : !loading ? (
          <p> No order place found</p>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};
