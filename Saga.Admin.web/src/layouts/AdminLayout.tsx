import { Outlet } from "react-router-dom";
import "./AdminLayout.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <Sidebar />
      </aside>

      <main className="main-content">
        <Header />

        <section className="page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default AdminLayout;
