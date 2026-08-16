import "./Sidebar.css";
import { LayoutDashboard, BookOpen, Settings, LogOut } from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div>
        <div className="logo">Saga</div>

        <nav className="navigation">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-button active" : "nav-button"
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/sagas"
            className={({ isActive }) =>
              isActive ? "nav-button active" : "nav-button"
            }
          >
            <BookOpen size={20} />
            Sagas
          </NavLink>

          <button className="nav-button">
            <Settings size={20} />
            Settings
          </button>
        </nav>
      </div>

      <button className="logout-button">
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
