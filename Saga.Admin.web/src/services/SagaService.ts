import {
  getAllSagas,
  getSagaById,
  createSaga,
  updateSaga,
  deleteSaga,
  createChapter,
  updateChapter,
  deleteChapter,
  createQuest,
  updateQuest,
  deleteQuest,
} from "../api/SagaApi";

import type { AdminResponseDto } from "../models/AdminResponseDto";
import type { AdminCreateSagaRequestDto } from "../models/AdminCreateSagaRequestDto";
import type { AdminCreateChapterRequestDto } from "../models/AdminCreateChapterRequestDto";
import type { AdminCreateQuestRequestDto } from "../models/AdminCreateQuestRequestDto";

export async function loadSagas(): Promise<AdminResponseDto[]> {
  return await getAllSagas();
}

export async function loadSaga(id: number): Promise<AdminResponseDto> {
  return await getSagaById(id);
}

export async function saveSaga(
  request: AdminCreateSagaRequestDto,
): Promise<AdminResponseDto> {
  return await createSaga(request);
}

export async function updateSagaData(
  id: number,
  request: AdminResponseDto,
): Promise<void> {
  await updateSaga(id, request);
}

export async function removeSaga(id: number): Promise<void> {
  await deleteSaga(id);
}

export async function saveChapter(
  sagaId: number,
  request: AdminCreateChapterRequestDto,
): Promise<void> {
  await createChapter(sagaId, request);
}

export async function updateChapterData(
  chapterId: number,
  request: AdminCreateChapterRequestDto,
): Promise<void> {
  await updateChapter(chapterId, request);
}

export async function removeChapter(chapterId: number): Promise<void> {
  await deleteChapter(chapterId);
}

export async function saveQuest(
  chapterId: number,
  request: AdminCreateQuestRequestDto,
): Promise<void> {
  await createQuest(chapterId, request);
}

export async function updateQuestData(
  questId: number,
  request: AdminCreateQuestRequestDto,
): Promise<void> {
  await updateQuest(questId, request);
}

export async function removeQuest(questId: number): Promise<void> {
  await deleteQuest(questId);
}
