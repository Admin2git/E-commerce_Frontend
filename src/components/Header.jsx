import React from "react";
import { Link } from "react-router-dom";
import UseCateContext from "../contexts/CategoryContext";

export const Header = () => {
  const { cart, searchTerm, setSearchTerm } = UseCateContext();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  console.log(setSearchTerm);

  return (
    <header className="">
      <nav className="navbar navbar-expand-lg  shadow-sm  bg-body-secondary py-3">
        <div className="container">
          {/* Brand */}
          <Link className="navbar-brand fw-normal" to="/">
            E-commerce Shopping
          </Link>

          {/* Toggler for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible content */}
          <div className="collapse navbar-collapse" id="navbarContent">
            {/* Center - Search */}
            <div className="mx-auto d-flex align-items-center my-2 my-lg-0 w-50">
              <i className="bi bi-search me-2"></i>
              <input
                className="form-control"
                type=""
                placeholder="Search for products, categories and more"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Right - Links */}
            <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
              <li className="nav-item">
                <Link to="/cart" className="nav-link position-relative">
                  <i className="bi bi-cart3 fs-5"></i> Cart
                  {totalItems > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.6rem" }}
                    >
                      {totalItems}
                    </span>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/wishlist">
                  <i className="bi bi-heart me-1"></i> Wishlist
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profilePage">
                  <i className="bi bi-person-circle me-1"></i> Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
