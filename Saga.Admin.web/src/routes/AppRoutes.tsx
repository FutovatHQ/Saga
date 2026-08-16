import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import Sagas from "../pages/Sagas";
import EditSaga from "../pages/EditSaga";

import AdminLayout from "../layouts/AdminLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/sagas" element={<Sagas />} />

          <Route path="/sagas/:id" element={<EditSaga />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
