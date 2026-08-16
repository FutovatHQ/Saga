import api from "./Api";

import type { AdminResponseDto } from "../models/AdminResponseDto";
import type { AdminCreateSagaRequestDto } from "../models/AdminCreateSagaRequestDto";
import type { AdminCreateChapterRequestDto } from "../models/AdminCreateChapterRequestDto";
import type { AdminCreateQuestRequestDto } from "../models/AdminCreateQuestRequestDto";

export async function getAllSagas(): Promise<AdminResponseDto[]> {
  const response = await api.get<AdminResponseDto[]>("/admin/sagas");

  return response.data;
}

export async function getSagaById(id: number): Promise<AdminResponseDto> {
  const response = await api.get<AdminResponseDto>(`/admin/sagas/${id}`);

  return response.data;
}

export async function createSaga(
  request: AdminCreateSagaRequestDto,
): Promise<AdminResponseDto> {
  const response = await api.post<AdminResponseDto>("/admin/sagas", request);

  return response.data;
}

export async function updateSaga(
  id: number,
  request: AdminResponseDto,
): Promise<void> {
  await api.put(`/admin/sagas/${id}`, request);
}

export async function deleteSaga(id: number): Promise<void> {
  await api.delete(`/admin/sagas/${id}`);
}

export async function createChapter(
  sagaId: number,
  request: AdminCreateChapterRequestDto,
): Promise<void> {
  await api.post(`/admin/sagas/${sagaId}/chapters`, request);
}

export async function updateChapter(
  chapterId: number,
  request: AdminCreateChapterRequestDto,
): Promise<void> {
  await api.put(`/admin/sagas/chapters/${chapterId}`, request);
}

export async function deleteChapter(chapterId: number): Promise<void> {
  await api.delete(`/admin/sagas/chapters/${chapterId}`);
}

export async function createQuest(
  chapterId: number,
  request: AdminCreateQuestRequestDto,
): Promise<void> {
  await api.post(`/admin/sagas/chapters/${chapterId}/quests`, request);
}

export async function updateQuest(
  questId: number,
  request: AdminCreateQuestRequestDto,
): Promise<void> {
  await api.put(`/admin/sagas/quests/${questId}`, request);
}

export async function deleteQuest(questId: number): Promise<void> {
  await api.delete(`/admin/sagas/quests/${questId}`);
}
