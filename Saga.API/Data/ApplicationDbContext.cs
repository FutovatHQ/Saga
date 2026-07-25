using Microsoft.EntityFrameworkCore;
using Saga.API.Models;

namespace Saga.API.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<SagaData> Sagas { get; set; }
    }
}
