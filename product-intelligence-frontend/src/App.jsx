import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";

import Dashboard from "./pages/Dashboard";

import Products from "./pages/Products";

import Uploads from "./pages/Uploads";

import Alerts from "./pages/Alerts";

import Jobs from "./pages/Jobs";

import Pricing from "./pages/Pricing";

import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />

        <Route path="products" element={<Products />} />

        <Route path="uploads" element={<Uploads />} />

        <Route path="products/:skuId" element={<ProductDetail />} />

        <Route path="alerts" element={<Alerts />} />

        <Route path="jobs" element={<Jobs />} />

        <Route path="pricing" element={<Pricing />} />
      </Route>
    </Routes>
  );
}

export default App;
