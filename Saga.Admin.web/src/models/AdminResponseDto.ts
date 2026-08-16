export interface AdminQuestResponseDto {
  questId: number;

  title: string;

  content: string;

  documentationLink: string;

  videoLink: string;
}

export interface AdminChapterResponseDto {
  chapterId: number;
  title: string;

  content: string;

  rewardPoints: number;

  quests: AdminQuestResponseDto[];
}

export interface AdminResponseDto {
  sagaDataId: number;
  name: string;

  category: string;

  description: string;

  completionBonusPoints: number;

  chapters: AdminChapterResponseDto[];
}
