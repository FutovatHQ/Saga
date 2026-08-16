namespace Saga.API.DTOs.Admin
{
    public class AdminCreateChapterRequestDto
    {
        public string Title { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

        public int RewardPoints { get; set; }
    }
}