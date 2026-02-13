import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./modules/Products/pages/productsPage";
import RawMaterialsPage from "./modules/RawMaterialsPage";
import ProductionPlanPage from "./modules/ProductionPlanPage";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/raw-materials" element={<RawMaterialsPage />} />
          <Route path="/production-plan" element={<ProductionPlanPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
