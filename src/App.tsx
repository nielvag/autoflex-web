import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./modules/Products/pages/productsPage";
import RawMaterialsPage from "./modules/RawMaterials/pages/RawMaterialsPage";
import ProductionPlanPage from "./modules/ProductionPlan/pages/ProductionPlanPage";
import MainLayout from "./layouts/MainLayout";
import AddEditProductPage from "./modules/Products/pages/addEditProduct";
import AddEditRawMaterialPage from "./modules/RawMaterials/pages/AddEditRawMaterial";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <ToastContainer theme="colored" closeOnClick />
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />

          <Route path="/products" element={<ProductsPage />} />
          <Route path="/new-product" element={<AddEditProductPage />} />
          <Route path="/products/:id" element={<AddEditProductPage />} />

          <Route path="/raw-materials" element={<RawMaterialsPage />} />
          <Route
            path="/new-raw-material"
            element={<AddEditRawMaterialPage />}
          />
          <Route
            path="/raw-material/:id"
            element={<AddEditRawMaterialPage />}
          />

          <Route path="/production-plan" element={<ProductionPlanPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
