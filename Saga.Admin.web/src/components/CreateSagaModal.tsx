import "./CreateSagaModal.css";

import { useState } from "react";

import { saveSaga } from "../services/SagaService";

type CreateSagaModalProps = {
  onClose: () => void;

  onSagaCreated: () => void;
};

function CreateSagaModal({
  onClose,

  onSagaCreated,
}: CreateSagaModalProps) {
  const [name, setName] = useState("");

  const [category, setCategory] = useState("");

  const [description, setDescription] = useState("");

  const [completionBonusPoints, setCompletionBonusPoints] = useState(0);

  const createSaga = async () => {
    try {
      await saveSaga({
        name,

        category,

        description,

        completionBonusPoints,
      });

      onSagaCreated();

      onClose();
    } catch {
      alert("Unable to create saga.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Create Saga</h2>

          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <input
            className="modal-input"
            placeholder="Saga Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="modal-input"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <textarea
            className="modal-textarea"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            className="modal-input"
            placeholder="Completion Bonus Points"
            value={completionBonusPoints}
            onChange={(e) => setCompletionBonusPoints(Number(e.target.value))}
          />
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>

          <button className="save-button" onClick={createSaga}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateSagaModal;
