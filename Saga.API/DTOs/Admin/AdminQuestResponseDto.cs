namespace Saga.API.DTOs.Admin
{
    public class AdminQuestResponseDto
    {
        public int QuestId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

        public string DocumentationLink { get; set; } = string.Empty;

        public string VideoLink { get; set; } = string.Empty;
    }
}