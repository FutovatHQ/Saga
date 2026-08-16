import "./Header.css";
import { Bell } from "lucide-react";

function Header() {
  return (
    <header className="header-container">
      <div></div>

      <div className="header-right">
        <Bell size={22} className="notification-icon" />

        <div className="admin-profile">
          <div className="avatar">R</div>

          <span>Ramesh</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
