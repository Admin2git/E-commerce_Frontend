import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Header } from "../components/Header";
import useFetch from "../useFetch";
import UseCateContext from "../contexts/CategoryContext";

export const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
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



  // 1. Fetch addresses on load
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_BASE_API_URL}/user/addresses`
  );
  console.log(data);

  useEffect(() => {
    if (data && data.length > 0) {
      setAddresses(data);
    }
  }, [data]);

  const handleSaveAddress = () => {
    if (isEditing) {
      const updatedAddress = { ...formData, _id: editingAddressId };
      // ✅ Step 1: Optimistically update local state
      const updatedAddresses = addresses.map((addr) =>
        addr._id === editingAddressId ? updatedAddress : addr
      );
      setAddresses(updatedAddresses);

      fetch(
        `${
          import.meta.env.VITE_BASE_API_URL
        }/user/addresses/${editingAddressId}`,
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

      //setAddresses(updatedAddresses);
      // toast.success("Address updated");
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

  if (loading) return <div className="d-flex justify-content-center align-items-center"  style={{ height: '50vh' }}>Loading...</div>;
  if (error)
    return <div className="container pt-4 pb-5 ">Error loading product</div>;

  return (
    <>
      <Header />
      <div className="container my-4">
        <h3>Your Addresses</h3>

        {!loading && !error && data?.length === 0 && (
          <p>No saved addresses found. Please add one.</p>
        )}

        <div className="row d-flex justify-content-between ">
          <div className="col-md-6 col-12 mt-3  justify-content-center">
            {addresses?.map((addr) => (
              <div key={addr._id} className="mb-3">
                <div className={`card p-3 mb-3  shadow-sm `}>
                  <div className="ms-3">
                    <label className="">
                      <strong>{addr.fullName}</strong> <br />
                      {addr.street}, {addr.city}, {addr.state}, {addr.country} -{" "}
                      {addr.postalCode}
                      <br />
                      Phone: {addr.phone}
                    </label>
                    <div className="d-flex gap-2 justify-content-end mt-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(addr);
                        }}
                      >
                        Edit
                      </button>
                      <div>
                        <button
                          className="btn btn-sm btn-danger "
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
              </div>
            ))}
          </div>
          <div className="col-md-6 col-12 ">
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-outline-secondary"
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
            </div>

            {showForm && (
              <div className="card p-3 my-4 shadow-sm">
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
        </div>
      </div>
    </>
  );
};
