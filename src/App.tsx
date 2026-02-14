import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./modules/Products/pages/productsPage";
import RawMaterialsPage from "./modules/RawMaterialsPage";
import ProductionPlanPage from "./modules/ProductionPlanPage";
import MainLayout from "./layouts/MainLayout";
import NewProductPage from "./modules/Products/pages/newProduct";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/raw-materials" element={<RawMaterialsPage />} />
          <Route path="/production-plan" element={<ProductionPlanPage />} />
          <Route path="/new-product" element={<NewProductPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
