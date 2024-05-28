using System.ComponentModel.DataAnnotations;

namespace TurnosAppBackend.Models
{
    public class Client
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Phone { get; set; }
        public List<Appointment>? Appointments { get; set; }
    }
}
