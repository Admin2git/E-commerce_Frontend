import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useFetch from "../useFetch";
import UseCateContext from "../contexts/CategoryContext";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";

export const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    userId: "6849315540bff452c746b05e",
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const { cart } = UseCateContext();
  console.log(cart);

  // 1. Fetch addresses on load
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_BASE_API_URL}/user/addresses`
  );
  console.log(data);

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const deliveryCharges = subtotal > 0 ? 499 : 0;
  const totalAmount = subtotal + deliveryCharges;

  //  Set addresses only once after data loads
  useEffect(() => {
    if (data && data.length > 0) {
      setAddresses(data);
      setSelectedAddressId(data[0]._id); // Select first address by default
    }
  }, [data]);
  // 2. Place order function
  const handlePlaceOrder = () => {
    if (!selectedAddressId || cart.length === 0) {
      toast.error("Please select an address and check your cart");
      return;
    }

    const orderData = {
      addressId: selectedAddressId,
      items: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity || 1,
      })),
      totalPrice: totalAmount,
    };

    console.log(orderData);

    fetch(`${import.meta.env.VITE_BASE_API_URL}/orders/place`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Order failed");
        return res.json();
      })
      .then(() => {
        toast.success("Order placed successfully ✅");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSaveAddress = () => {
    if (isEditing) {
      const updatedAddress = { ...formData, _id: editingAddressId };
      //  Step 1: Optimistically update local state
      const updatedAddresses = addresses.map((addr) =>
        addr._id === editingAddressId ? updatedAddress : addr
      );
      setAddresses(updatedAddresses);

      fetch(
        `${import.meta.env.VITE_BASE_API_URL}/user/addresses/${editingAddressId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAddress),
        }
      )
        .then((res) => {
          if (!res.ok) throw new Error("failed to update.");
          return res.json();
        })
        .then(() => {
          toast.success("Address updated successfully ✅");
        })
        .catch((error) => {
          console.error(error);
        });

      
    } else {
      const newAddress = { ...formData };
      setAddresses([...addresses, newAddress]);
      fetch(`${import.meta.env.VITE_BASE_API_URL}/user/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAddress),
      })
        .then((res) => {
          if (!res.ok) throw new Error(" failed to Add");
          return res.json();
        })
        .then(() => {
          toast.success("Address added successfully ✅");
        })
        .catch((error) => {
          console.error(error);
        });

      //toast.success("Address added");
    }
    setFormData({
      userId: "6849315540bff452c746b05e",
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });
    setShowForm(false);
    setIsEditing(false);
    setEditingAddressId(null);
  };

  const handleDelete = (address) => {
    const originalAddresses = [...addresses];
    setAddresses(addresses.filter((addr) => addr._id !== address._id));
    if (selectedAddressId === address._id) {
      setSelectedAddressId(null);
    }

    fetch(
      `${import.meta.env.VITE_BASE_API_URL}/user/addresses/${address._id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed ");
        return res.json();
      })
      .then(() => {
        toast.success("Address deleted ✅");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Delete failed ❌");

        // 🔁 Rollback to previous state
        setAddresses(originalAddresses);
      });
  };

  const handleEdit = (addr) => {
    setFormData({
      userId: "6849315540bff452c746b05e",
      name: addr.name,
      phone: addr.phone,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      postalCode: addr.postalCode,
      country: addr.country,
    });
    setEditingAddressId(addr._id);
    setIsEditing(true);
    setShowForm(true);
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h3>Select Delivery Address</h3>

        {loading && <div>Loading...</div>}
        {error && <div>Error loading addresses</div>}

        {!loading && !error && addresses.length === 0 && (
          <p>No saved addresses found. Please add one.</p>
        )}

        <div className="row d-flex justify-content-between ">
          <div className="col-md-6 mt-3  justify-content-center">
            {addresses?.map((addr) => (
              <div key={addr._id} className="col">
                <div
                  className={`card p-3 mb-3  shadow-sm ${
                    selectedAddressId === addr._id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedAddressId(addr._id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="form-check">
                    <input
                      type="radio"
                      name="address"
                      className="form-check-input"
                      value={addr._id}
                      checked={selectedAddressId === addr._id}
                      onChange={() => setSelectedAddressId(addr._id)}
                    />
                    <label className="form-check-label">
                      <strong>{addr.fullName}</strong> <br />
                      {addr.street}, {addr.city}, {addr.state}, {addr.country} -{" "}
                      {addr.postalCode}
                      <br />
                      Phone: {addr.phone}
                    </label>
                    <button
                      className="btn btn-sm btn-outline-secondary   float-end"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(addr);
                      }}
                    >
                      Edit
                    </button>
                    <div>
                      <button
                        className="btn btn-sm btn-danger align-items-center float-end"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(addr);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="btn btn-outline-secondary "
              onClick={() => {
                setShowForm(true);
                setFormData({
                  userId: "6849315540bff452c746b05e",
                  name: "",
                  phone: "",
                  street: "",
                  city: "",
                  state: "",
                  postalCode: "",
                  country: "",
                });
                setIsEditing(false);
              }}
            >
              + Add New Address
            </button>

            {showForm && (
              <div className="card p-3 mt-4 shadow-sm">
                <h5>Add New Address</h5>
                <div className="row">
                  {Object.keys(formData).map((key) => (
                    <div className="col-md-6 mb-3" key={key}>
                      <label className="form-label text-capitalize">
                        {key}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData[key]}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="btn btn-primary my-3"
                  onClick={handleSaveAddress}
                >
                  {isEditing ? "Update Address" : "Save Address"}
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Right - Price Details */}
          <div className="col-md-4 mt-2 ">
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="fw-bold mb-3">ORDER SUMMARY </h6>
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

              <button
                className="btn btn-primary w-100"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
