import "./StatCard.css";

type StatCardProps = {
  title: string;

  value: number;
};

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
}

export default StatCard;
