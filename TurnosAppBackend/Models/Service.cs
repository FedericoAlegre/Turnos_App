using System.ComponentModel.DataAnnotations;

namespace TurnosAppBackend.Models
{
    public class Service
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public double? Price { get; set; }
        public bool? IsActive { get; set; }
        public List<Appointment>? Appointments { get; set; }
         
    }
}
