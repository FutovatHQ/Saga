namespace Saga.API.DTOs.Admin
{
    public class AdminCreateSagaRequestDto
    {
        public string Name { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public int CompletionBonusPoints { get; set; }
    }
}