import "./Sagas.css";

import { useEffect, useState } from "react";

import type { AdminResponseDto } from "../models/AdminResponseDto";

import SagaCard from "../components/SagaCard";
import CreateSagaModal from "../components/CreateSagaModal";

import { loadSagas, removeSaga } from "../services/SagaService";

function Sagas() {
  const [sagas, setSagas] = useState<AdminResponseDto[]>([]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const loadSagaData = async () => {
      try {
        const response = await loadSagas();

        setSagas(response);
      } catch {
        alert("Unable to load sagas.");
      }
    };

    void loadSagaData();
  }, []);

  const refresh = async () => {
    const response = await loadSagas();

    setSagas(response);
  };

  const deleteSaga = async (id: number) => {
    if (!confirm("Delete this saga?")) return;

    try {
      await removeSaga(id);

      await refresh();
    } catch {
      alert("Unable to delete saga.");
    }
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Sagas</h1>

          <p>Manage all your learning sagas.</p>
        </div>

        <button
          className="create-button"
          onClick={() => setShowCreateModal(true)}
        >
          + Create Saga
        </button>
      </div>

      {sagas.map((saga) => (
        <SagaCard
          key={saga.sagaDataId}
          id={saga.sagaDataId}
          title={saga.name}
          category={saga.category}
          chapters={saga.chapters.length}
          rewardPoints={saga.completionBonusPoints}
          onDelete={deleteSaga}
        />
      ))}

      {showCreateModal && (
        <CreateSagaModal
          onClose={() => setShowCreateModal(false)}
          onSagaCreated={refresh}
        />
      )}
    </>
  );
}

export default Sagas;
