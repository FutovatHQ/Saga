using Saga.API.Models;

namespace Saga.API.DTOs.Admin
{
    public class AdminResponseDto
    {
        public int SagaDataId { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public int CompletionBonusPoints { get; set; }

        public List<AdminChapterResponseDto> Chapters { get; set; } = [];
    }
}
