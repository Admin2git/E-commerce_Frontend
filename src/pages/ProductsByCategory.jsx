import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { Header } from "../components/Header";
import { ProductCard } from "./ProductCard";
import UseCateContext from "../contexts/CategoryContext";
import toast from "react-hot-toast";

export const ProductsByCategory = () => {
  const [filters, setFilters] = useState({
    price: [50, 5000],
    rating: "1 Stars & above",
    sortBy: "Price - Low to High",
  });

  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    searchTerm,
    setSearchTerm,
  } = UseCateContext();

  const { categoryId } = useParams();
  console.log(categoryId);
  const {
    data: products,
    loading,
    error,
  } = useFetch(
    `${import.meta.env.VITE_BASE_API_URL}/products/category/${categoryId}`
  );

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    // Filter products based on searchTerm whenever it changes
    if (products) {
      const filtered = products?.filter(
        (product) =>
          product.name
            .split(" ")
            .join("")
            .toLowerCase()
            .includes(searchTerm.split(" ").join("").toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredProducts(filtered);
    }
  }, [products, searchTerm]);

  console.log(setSearchTerm);
  console.log(searchTerm);

  const filteredData = filteredProducts?.filter((product) => {
    const inPriceRange =
      product.price >= filters.price[0] && product.price <= filters.price[1];
    const minRating = parseInt(filters.rating.split(" ")[0]);
    const matchesRating = product.rating >= minRating;

    return inPriceRange && matchesRating;
  });

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="container pt-4 pb-5 ">Error loading data</div>;
  }
  console.log(products);

  function handleFilterChange(filterName, value) {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  }
  console.log(filters);

  if (filteredData && Array.isArray(filteredData)) {
    if (filters.sortBy === "Price - Low to High") {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "Price - High to Low") {
      filteredData.sort((a, b) => b.price - a.price);
    }
  }

  console.log(filteredData);

  return filteredData ? (
    <>
      <Header />

      <div className="px-5">
        <div className="row">
          <button
            className="btn btn-outline-primary d-md-none mb-3"
            data-bs-toggle="collapse"
            data-bs-target="#filtersCollapse"
          >
            Toggle Filters
          </button>

          <div
            id="filtersCollapse"
            className="collapse d-md-block col-md-3 col-12 pe-5"
          >
            {/* Filters Sidebar */}

            <div className="d-flex justify-content-between align-items-center mt-3">
              <h5>Filters</h5>
              <button
                className="btn btn-secondary mt-2"
                onClick={() =>
                  setFilters({
                    price: [50, 5000],
                    rating: "1 Stars & above",
                    sortBy: "Price - Low to High",
                  })
                }
              >
                Reset Filters
              </button>
            </div>
            <div className="mt-4">
              <h6>Price</h6>
              <div className="mb-3">
                <label htmlFor="priceRange" className="form-label">
                  Max Price: ₹{filters.price[1]}
                </label>
                <input
                  id="priceRange"
                  type="range"
                  className="form-range"
                  min="50"
                  max="5000"
                  value={filters.price[1]}
                  onChange={(e) =>
                    handleFilterChange("price", [
                      filters.price[0],
                      Number(e.target.value),
                    ])
                  }
                />
                <div className="d-flex justify-content-between">
                  <small>₹50</small>
                  <small>₹5000</small>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h6>Rating</h6>
              <label>
                <input
                  type="radio"
                  name="rating"
                  value="4 Stars & above"
                  checked={filters.rating === "4 Stars & above"}
                  onChange={() =>
                    handleFilterChange("rating", "4 Stars & above")
                  }
                />
                4 Stars & above
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="rating"
                  value="3 Stars & above"
                  checked={filters.rating === "3 Stars & above"}
                  onChange={() =>
                    handleFilterChange("rating", "3 Stars & above")
                  }
                />
                3 Stars & above
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="rating"
                  value="2 Stars & above"
                  checked={filters.rating === "2 Stars & above"}
                  onChange={() =>
                    handleFilterChange("rating", "2 Stars & above")
                  }
                />
                2 Stars & above
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="rating"
                  value="1 Stars & above"
                  checked={filters.rating === "1 Stars & above"}
                  onChange={() =>
                    handleFilterChange("rating", "1 Stars & above")
                  }
                />
                1 Stars & above
              </label>
            </div>

            <div className="mt-4">
              <h6>Sort by</h6>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="Price - Low to High"
                  checked={filters.sortBy === "Price - Low to High"}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                />
                Price - Low to High
              </label>

              <br />
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="Price - High to Low"
                  checked={filters.sortBy === "Price - High to Low"}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                />
                Price - High to Low
              </label>
            </div>
          </div>

          {/* Product List */}
          <div className="col-md-9 col-12">
            <h4 className=" my-4">All Products</h4>
            <div className=" row">
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((product) => (
                  <div className="col-md-4 col-sm-6 mb-4" key={product._id}>
                    <ProductCard
                      key={product._id}
                      product={product}
                      id={product._id}
                      name={product.name}
                      image={product.image}
                      price={product.price}
                      rating={product.rating}
                      onAddToCart={() => {
                        addToCart(product);
                      }}
                      onAddToWishlist={() => addToWishlist(product)}
                      onRemoveFromWishlist={() =>
                        removeFromWishlist(product._id)
                      }
                    />
                  </div>
                ))
              ) : (
                <p>No Products Found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p
      className="d-flex justify-content-center align-items-center"
      style={{ height: "50vh" }}
    >
      {" "}
      Loading...
    </p>
  );
};
