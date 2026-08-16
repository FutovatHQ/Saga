import "./CreateSagaModal.css";

import { useEffect, useState } from "react";

import { saveQuest, updateQuestData } from "../services/SagaService";

type Props = {
  chapterId: number;

  questId?: number;

  title?: string;

  content?: string;

  documentationLink?: string;

  videoLink?: string;

  onClose: () => void;

  onCreated: () => void;
};

function CreateQuestModal({
  chapterId,

  questId,

  title: initialTitle,

  content: initialContent,

  documentationLink: initialDocumentationLink,

  videoLink: initialVideoLink,

  onClose,

  onCreated,
}: Props) {
  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [documentationLink, setDocumentationLink] = useState("");

  const [videoLink, setVideoLink] = useState("");

  useEffect(() => {
    if (questId) {
      setTitle(initialTitle ?? "");

      setContent(initialContent ?? "");

      setDocumentationLink(initialDocumentationLink ?? "");

      setVideoLink(initialVideoLink ?? "");
    }
  }, [
    questId,

    initialTitle,

    initialContent,

    initialDocumentationLink,

    initialVideoLink,
  ]);

  const save = async () => {
    if (questId) {
      await updateQuestData(
        questId,

        {
          title,

          content,

          documentationLink,

          videoLink,
        },
      );
    } else {
      await saveQuest(
        chapterId,

        {
          title,

          content,

          documentationLink,

          videoLink,
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
          <h2>{questId ? "Edit Quest" : "Create Quest"}</h2>
        </div>

        <div className="modal-body">
          <input
            className="modal-input"
            placeholder="Quest Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="modal-textarea"
            placeholder="Quest Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <input
            className="modal-input"
            placeholder="Documentation Link"
            value={documentationLink}
            onChange={(e) => setDocumentationLink(e.target.value)}
          />

          <input
            className="modal-input"
            placeholder="Video Link"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
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

export default CreateQuestModal;
