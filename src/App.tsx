import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
// import { DataContext } from "./contextApi/DataContextProvider";

import Header from "./components/Header/Header";
import CartPage from "./pages/Cart/CartPage";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<CartPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
