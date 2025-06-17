import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EcommerceProvider } from "./contexts/CategoryContext";
import { Home } from "./pages/Home";
import { ProductsByCategory } from "./pages/ProductsByCategory";
import { ProductDetail } from "./pages/ProductDetail";
import { CartPage } from "./pages/CartPage";
import { WishlistPage } from "./pages/WishlistPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import { Addresses } from "./pages/Addresses";
import { OrderHistory } from "./pages/OrderHistory";
import PlaceOrderSuccess from "./pages/PlaceOrderSuccess";

function App() {
  return (
    <Router>
      <EcommerceProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products/category/:categoryId"
            element={<ProductsByCategory />}
          />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkoutPage" element={<CheckoutPage />} />
          <Route path="/profilePage" element={<UserProfilePage />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="/orderHistory" element={<OrderHistory />} />
          <Route
            path="/checkoutPage/orderSuccess"
            element={<PlaceOrderSuccess  />}
          />
        </Routes>
      </EcommerceProvider>
    </Router>
  );
}

export default App;
