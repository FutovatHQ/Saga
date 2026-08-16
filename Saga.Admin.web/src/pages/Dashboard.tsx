import "./Dashboard.css";

import StatCard from "../components/StatCard";

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>

      <p className="welcome">Welcome back, Ramesh 👋</p>

      <div className="stats">
        <StatCard title="Total Sagas" value={3} />

        <StatCard title="Total Chapters" value={15} />

        <StatCard title="Total Quests" value={42} />
      </div>
    </>
  );
}

export default Dashboard;
