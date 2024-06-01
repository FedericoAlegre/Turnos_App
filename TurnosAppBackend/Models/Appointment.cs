using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
        public int? ClientId {  get; set; }
        public Service? Service { get; set; }
        
        [Required]
        public int ServiceId { get; set; }
        
        public double? TotalPrice { get; set; }
        public bool? IsPaid { get; set; }


    }
}
