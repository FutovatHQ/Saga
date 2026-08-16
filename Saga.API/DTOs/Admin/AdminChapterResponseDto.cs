namespace Saga.API.DTOs.Admin
{
    public class AdminChapterResponseDto
    {
        public int ChapterId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

        public int RewardPoints { get; set; }

        public List<AdminQuestResponseDto> Quests { get; set; } = [];
    }
}