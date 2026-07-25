using Microsoft.AspNetCore.Mvc;
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
            if (sagas == null || sagas.Count == 0)
            {
                return NotFound("No sagas found.");
            }
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
    }
}
