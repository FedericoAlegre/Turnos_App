using System.ComponentModel.DataAnnotations;

namespace TurnosAppBackend.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        [Required]
        public DateOnly Date {  get; set; }
        [Required]
        public string? Hour { get; set; }
        public Client? Client { get; set; }
        [Required]
        public int ClientId {  get; set; }


    }
}
