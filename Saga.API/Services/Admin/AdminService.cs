using Saga.API.Data;
using Saga.API.Interfaces.Admin;
using Saga.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Saga.API.Services.Admin
{
    public class AdminService : IAdminService
    {
        private readonly ApplicationDbContext _context;

        public AdminService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<SagaData>> GetAllSagasAsync()
        {
          return await _context.Sagas.Include(s => s.Chapters).ThenInclude(c => c.Quests).ToListAsync();
        }

        public async Task<SagaData?> GetSagaByIdAsync(int sagaId)
        {
         return await _context.Sagas.Include(s => s.Chapters).
                ThenInclude(c => c.Quests).
                FirstOrDefaultAsync(s => s.SagaDataId == sagaId);
        }
    }
}
