using Microsoft.EntityFrameworkCore;
using TurnosAppBackend.Models;

namespace TurnosAppBackend.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Appointment> Appointments { get; set; } = default!; 
        public DbSet<Client> Clients { get; set; } = default!;
        public DbSet<User> Users { get; set; } = default!;
        public DbSet<Service> Services { get; set; } = default!;
    }
}
