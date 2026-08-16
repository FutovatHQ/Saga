using Saga.API.DTOs.Admin;
using Saga.API.Models;
        
namespace Saga.API.Interfaces.Admin
{
    public interface IAdminService
    {
        public Task<List<AdminResponseDto>> GetAllSagasAsync();
        public Task<AdminResponseDto?> GetSagaByIdAsync(int sagaId);
        Task UpdateSagaAsync(int sagaId, AdminResponseDto request);
        Task CreateSagaAsync(AdminCreateSagaRequestDto request);
        Task CreateChapterAsync(int sagaId, AdminCreateChapterRequestDto request);
        Task CreateQuestAsync(int chapterId, AdminCreateQuestRequestDto request);
        Task DeleteSagaAsync(int sagaId);
        Task DeleteChapterAsync(int chapterId);
        Task DeleteQuestAsync(int questId);
        Task UpdateChapterAsync(int chapterId, AdminCreateChapterRequestDto request);
        Task UpdateQuestAsync(int questId,AdminCreateQuestRequestDto request);
    }
}
