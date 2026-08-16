import "./CreateSagaModal.css";

import { useEffect, useState } from "react";

import { saveChapter, updateChapterData } from "../services/SagaService";

type Props = {
  sagaId: number;

  chapterId?: number;

  title?: string;

  content?: string;

  rewardPoints?: number;

  onClose: () => void;

  onCreated: () => void;
};

function CreateChapterModal({
  sagaId,

  chapterId,

  title: initialTitle,

  content: initialContent,

  rewardPoints: initialRewardPoints,

  onClose,

  onCreated,
}: Props) {
  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [rewardPoints, setRewardPoints] = useState(0);

  useEffect(() => {
    if (chapterId) {
      setTitle(initialTitle ?? "");

      setContent(initialContent ?? "");

      setRewardPoints(initialRewardPoints ?? 0);
    }
  }, [chapterId, initialTitle, initialContent, initialRewardPoints]);

  const save = async () => {
    if (chapterId) {
      await updateChapterData(
        chapterId,

        {
          title,

          content,

          rewardPoints,
        },
      );
    } else {
      await saveChapter(
        sagaId,

        {
          title,

          content,

          rewardPoints,
        },
      );
    }

    onCreated();

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{chapterId ? "Edit Chapter" : "Create Chapter"}</h2>
        </div>

        <div className="modal-body">
          <input
            className="modal-input"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="modal-textarea"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <input
            type="number"
            className="modal-input"
            placeholder="Reward Points"
            value={rewardPoints}
            onChange={(e) => setRewardPoints(Number(e.target.value))}
          />
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>

          <button className="save-button" onClick={save}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateChapterModal;
