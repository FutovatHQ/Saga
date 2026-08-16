import "./SagaCard.css";

import { useNavigate } from "react-router-dom";

type SagaCardProps = {
  id: number;

  title: string;

  category: string;

  chapters: number;

  rewardPoints: number;

  onDelete: (id: number) => void;
};

function SagaCard({
  id,

  title,

  category,

  chapters,

  rewardPoints,

  onDelete,
}: SagaCardProps) {
  const navigate = useNavigate();

  return (
    <div className="saga-card">
      <div>
        <h2>{title}</h2>

        <p>{category}</p>

        <span>{chapters} Chapters</span>
      </div>

      <div className="card-right">
        <h3>{rewardPoints} XP</h3>

        <div className="card-buttons">
          <button
            className="edit-button"
            onClick={() => navigate(`/sagas/${id}`)}
          >
            Edit
          </button>

          <button className="delete-button" onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default SagaCard;
