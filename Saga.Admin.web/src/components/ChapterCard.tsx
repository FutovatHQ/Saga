import "./ChapterCard.css";

type Quest = {
  questId: number;
  title: string;
  content: string;
  documentationLink?: string;
  videoLink?: string;
};

type ChapterCardProps = {
  chapterId: number;
  title: string;
  content: string;
  rewardPoints: number;
  quests: Quest[];

  onAddQuest: (chapterId: number) => void;

  onDelete: (chapterId: number) => void;

  onDeleteQuest: (questId: number) => void;

  onEditChapter: (chapter: {
    chapterId: number;
    title: string;
    content: string;
    rewardPoints: number;
  }) => void;

  onEditQuest: (quest: Quest) => void;
};

function ChapterCard({
  chapterId,
  title,
  content,
  rewardPoints,
  quests,
  onAddQuest,
  onDelete,
  onDeleteQuest,
  onEditChapter,
  onEditQuest,
}: ChapterCardProps) {
  return (
    <div className="chapter-card">
      <div className="chapter-top">
        <div>
          <h3>{title}</h3>

          <p>Reward : {rewardPoints} XP</p>
        </div>

        <div className="chapter-buttons">
          <button
            className="edit-button"
            onClick={() =>
              onEditChapter({
                chapterId,
                title,
                content,
                rewardPoints,
              })
            }
          >
            Edit
          </button>

          <button className="delete-button" onClick={() => onDelete(chapterId)}>
            Delete
          </button>
        </div>
      </div>

      <div className="quest-section">
        <div className="quest-header">
          <h4>Quests</h4>

          <button className="add-button" onClick={() => onAddQuest(chapterId)}>
            + Add Quest
          </button>
        </div>

        {quests.length === 0 ? (
          <p className="no-quests">No quests yet.</p>
        ) : (
          quests.map((quest) => (
            <div key={quest.questId} className="quest-card">
              <strong>{quest.title}</strong>

              <p>{quest.content}</p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <button
                  className="edit-button"
                  onClick={() => onEditQuest(quest)}
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() => onDeleteQuest(quest.questId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ChapterCard;
