using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Text.Json;
using System.Text.RegularExpressions;
using TurnosAppBackend.Data;
using TurnosAppBackend.Models;

namespace TurnosAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        public AppDbContext AppDbContext { get; set; }
        public ClientController ClientController { get; set; }
        public AppointmentController(AppDbContext appDbContext)
        {
            this.AppDbContext = appDbContext;
            this.ClientController = new ClientController(appDbContext);
            
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetList()
        {
            List<Appointment> list = new List<Appointment>();

            try
            {
                list = await this.AppDbContext.Appointments.ToListAsync();
                foreach (Appointment item in list)
                {
                    item.Client = await this.AppDbContext.Clients.FindAsync(item.ClientId);
                    item.Client!.Appointments = null;
                    item.Service = await this.AppDbContext.Services.FindAsync(item.ServiceId);
                    item.Service!.Appointments = null;
                }

                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message, response = list });
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Add([FromBody] Appointment model)
        {

            try
            {
                if (model == null) return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Appointment was null" });
                if (model.Client == null) return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Client was null" });
                if (model.ServiceId == 0 ) return StatusCode(StatusCodes.Status500InternalServerError, new { message = "ServiceId was null" });
                if (!await CheckDate(model.Date, model.Hour!)) return StatusCode(StatusCodes.Status200OK, new { message = "Appointment not available" });

                var dbClient = this.AppDbContext.Clients.FirstOrDefaultAsync(x => x.Phone!.Equals(model.Client.Phone));
                if (dbClient.Result != null)
                {
                    model.Client = null;
                    model.ClientId = dbClient.Result!.Id;
                }
                AppDbContext.Appointments.Add(model);
                await AppDbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new { message = "OK" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPost]
        [Route("update")]
        [Authorize]
        public async Task<ActionResult> Update([FromBody] Appointment model)
        {

            try
            {
                if (model == null) return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Appointment was null" });
                var dbModel = this.AppDbContext.Appointments.Find(model.Id);
                if (dbModel is null) return StatusCode(StatusCodes.Status404NotFound, new { message = "NOT FOUND", response = model });
                if (!await CheckDate(model.Date, model.Hour!)) return StatusCode(StatusCodes.Status200OK, new { message = "Appointment not available" });

                dbModel.ClientId = model.ClientId == 0 ? dbModel.ClientId : model.ClientId;
                dbModel.ServiceId = model.ServiceId == 0 ? dbModel.ServiceId : model.ServiceId;
                dbModel.Date = dbModel.Date.Equals(model.Date) ? dbModel.Date : model.Date;
                dbModel.Hour = model.Hour ==  dbModel.Hour ? dbModel.Hour : model.Hour;
                this.AppDbContext.Appointments.Update(dbModel);

                await this.AppDbContext.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK, new { message = "Appointment Updated", response = model });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpDelete]
        [Authorize]
        [Route("delete/{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                Appointment dbAppointment = this.AppDbContext.Appointments.Find(id)!;
                if (dbAppointment != null)
                {

                    this.AppDbContext.Appointments.Remove(dbAppointment);
                    await this.AppDbContext.SaveChangesAsync();

                    return StatusCode(StatusCodes.Status200OK, new { message = "OK", response = dbAppointment });
                }

                return StatusCode(StatusCodes.Status404NotFound, new { message = "NOT FOUND", response = id });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        private async Task<bool> CheckDate(DateOnly date, string hour)
        {
            var appointment = await AppDbContext.Appointments.Where(x => x.Date.Equals(date)).FirstOrDefaultAsync(x => x.Hour!.Equals(hour));
            return appointment is null ? true : false;
        }
    }
}
