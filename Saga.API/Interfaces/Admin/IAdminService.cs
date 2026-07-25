using Saga.API.Models;
        
namespace Saga.API.Interfaces.Admin
{
    public interface IAdminService
    {
        public Task<List<SagaData>> GetAllSagasAsync();
        public Task<SagaData?> GetSagaByIdAsync(int sagaId);
    }
}
