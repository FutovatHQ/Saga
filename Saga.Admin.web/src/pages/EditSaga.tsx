import "./EditSaga.css";

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { AdminResponseDto } from "../models/AdminResponseDto";

import {
  loadSaga,
  updateSagaData,
  removeChapter,
  removeQuest,
} from "../services/SagaService";

import ChapterCard from "../components/ChapterCard";
import CreateChapterModal from "../components/CreateChapterModal";
import CreateQuestModal from "../components/CreateQuestModal";

type EditingChapter = {
  chapterId: number;
  title: string;
  content: string;
  rewardPoints: number;
};

type EditingQuest = {
  questId: number;
  title: string;
  content: string;
  documentationLink?: string;
  videoLink?: string;
};

function EditSaga() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [saga, setSaga] = useState<AdminResponseDto>();

  const [showCreateChapter, setShowCreateChapter] = useState(false);

  const [showCreateQuest, setShowCreateQuest] = useState(false);

  const [selectedChapterId, setSelectedChapterId] = useState<number>();
  const [editingChapter, setEditingChapter] = useState<EditingChapter | null>(
    null,
  );

  const [editingQuest, setEditingQuest] = useState<EditingQuest | null>(null);
  const loadSagaAsync = useCallback(async () => {
    if (!id) return;

    const response = await loadSaga(Number(id));

    setSaga(response);
  }, [id]);

  useEffect(() => {
    void loadSagaAsync();
  }, [loadSagaAsync]);
  const saveSaga = async () => {
    if (!id || !saga) return;

    await updateSagaData(Number(id), saga);

    alert("Saga Updated Successfully.");

    navigate("/sagas");
  };

  const deleteChapter = async (chapterId: number) => {
    if (!confirm("Delete this chapter?")) return;

    await removeChapter(chapterId);

    await loadSagaAsync();
  };

  const deleteQuest = async (questId: number) => {
    if (!confirm("Delete this quest?")) return;

    await removeQuest(questId);

    await loadSagaAsync();
  };

  if (!saga) return <h2>Loading...</h2>;

  return (
    <>
      <div className="edit-header">
        <div>
          <h1>Edit Saga</h1>

          <p>Editing {saga.name}</p>
        </div>

        <button className="save-button" onClick={saveSaga}>
          Save Changes
        </button>
      </div>

      <div className="edit-card">
        <label>Name</label>

        <input
          className="edit-input"
          value={saga.name}
          onChange={(e) =>
            setSaga({
              ...saga,
              name: e.target.value,
            })
          }
        />

        <label>Category</label>

        <input
          className="edit-input"
          value={saga.category}
          onChange={(e) =>
            setSaga({
              ...saga,
              category: e.target.value,
            })
          }
        />

        <label>Description</label>

        <textarea
          className="edit-textarea"
          value={saga.description}
          onChange={(e) =>
            setSaga({
              ...saga,
              description: e.target.value,
            })
          }
        />

        <label>Completion Bonus XP</label>

        <input
          type="number"
          className="edit-input"
          value={saga.completionBonusPoints}
          onChange={(e) =>
            setSaga({
              ...saga,
              completionBonusPoints: Number(e.target.value),
            })
          }
        />
      </div>

      <div className="chapter-section">
        <div className="chapter-header">
          <h2>Chapters</h2>

          <button
            className="add-button"
            onClick={() => setShowCreateChapter(true)}
          >
            + Add Chapter
          </button>
        </div>

        {saga.chapters.map((chapter) => (
          <ChapterCard
            key={chapter.chapterId}
            chapterId={chapter.chapterId}
            title={chapter.title}
            content={chapter.content}
            rewardPoints={chapter.rewardPoints}
            quests={chapter.quests}
            onAddQuest={(chapterId) => {
              setSelectedChapterId(chapterId);
              setEditingQuest(null);
              setShowCreateQuest(true);
            }}
            onDelete={deleteChapter}
            onDeleteQuest={deleteQuest}
            onEditChapter={(chapterData) => {
              setEditingChapter(chapterData);
              setShowCreateChapter(true);
            }}
            onEditQuest={(quest) => {
              setEditingQuest(quest);
              setSelectedChapterId(chapter.chapterId);
              setShowCreateQuest(true);
            }}
          />
        ))}
      </div>

      {showCreateChapter && id && (
        <CreateChapterModal
          sagaId={Number(id)}
          chapterId={editingChapter?.chapterId}
          title={editingChapter?.title}
          rewardPoints={editingChapter?.rewardPoints}
          onClose={() => {
            setShowCreateChapter(false);
            setEditingChapter(null);
          }}
          onCreated={loadSagaAsync}
        />
      )}

      {showCreateQuest && selectedChapterId && (
        <CreateQuestModal
          chapterId={selectedChapterId!}
          questId={editingQuest?.questId}
          title={editingQuest?.title}
          content={editingQuest?.content}
          documentationLink={editingQuest?.documentationLink}
          videoLink={editingQuest?.videoLink}
          onClose={() => {
            setShowCreateQuest(false);
            setEditingQuest(null);
          }}
          onCreated={loadSagaAsync}
        />
      )}
    </>
  );
}

export default EditSaga;
