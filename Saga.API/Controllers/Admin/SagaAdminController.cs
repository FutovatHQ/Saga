using Microsoft.AspNetCore.Mvc;
using Saga.API.DTOs.Admin;
using Saga.API.Interfaces.Admin;

namespace Saga.API.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/sagas")]
    public class SagaAdminController : ControllerBase
    {
        private readonly IAdminService adminService;

        public SagaAdminController(IAdminService adminService)
        {
            this.adminService = adminService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSagas()
        {
            var sagas = await adminService.GetAllSagasAsync();

            return Ok(sagas);
        }

        [HttpGet("{sagaId}")]
        public async Task<IActionResult> GetSagaById(int sagaId)
        {
            var saga = await adminService.GetSagaByIdAsync(sagaId);
            if (saga == null)
            {
                return NotFound($"Saga with ID {sagaId} not found.");
            }
            return Ok(saga);

        }

        [HttpPut("{sagaId}")]
        public async Task<IActionResult> UpdateSaga(int sagaId, AdminResponseDto request)
        {
            await adminService.UpdateSagaAsync(sagaId, request);

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> CreateSaga(AdminCreateSagaRequestDto request)
        {
            await adminService.CreateSagaAsync(request);

            return Ok();
        }

        [HttpPost("{sagaId}/chapters")]

        public async Task<IActionResult> CreateChapter(int sagaId, AdminCreateChapterRequestDto request)
        {
            await adminService.CreateChapterAsync(sagaId, request);

            return Ok();
        }

        [HttpPost("chapters/{chapterId}/quests")]
        public async Task<IActionResult> CreateQuest(int chapterId, AdminCreateQuestRequestDto request)
        {
            await adminService.CreateQuestAsync(chapterId, request);

            return Ok();
        }

        [HttpDelete("{sagaId}")]
        public async Task<IActionResult> DeleteSaga(int sagaId)
        {
            await adminService.DeleteSagaAsync(sagaId);

            return NoContent();
        }

        [HttpDelete("chapters/{chapterId}")]
        public async Task<IActionResult> DeleteChapter(int chapterId)
        {
            await adminService.DeleteChapterAsync(chapterId);

            return NoContent();
        }

        [HttpDelete("quests/{questId}")]
        public async Task<IActionResult> DeleteQuest(int questId)
        {
            await adminService.DeleteQuestAsync(questId);

            return NoContent();
        }

        [HttpPut("chapters/{chapterId}")]
        public async Task<IActionResult> UpdateChapter( int chapterId, AdminCreateChapterRequestDto request)
        {
            await adminService.UpdateChapterAsync(chapterId, request);

            return NoContent();
        }

        [HttpPut("quests/{questId}")]
        public async Task<IActionResult> UpdateQuest( int questId, AdminCreateQuestRequestDto request)
        {
            await adminService.UpdateQuestAsync(questId, request);

            return NoContent();
        }
    }
}
