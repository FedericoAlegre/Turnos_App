using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TurnosAppBackend.Data;
using TurnosAppBackend.Models;
using TurnosAppBackend.Responses;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace TurnosAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController(AppDbContext appDbContext) : ControllerBase
    {
        public AppDbContext AppDbContext { get; set; } = appDbContext;


        [HttpGet]
        [Authorize]
        public async Task<ActionResult> GetList()
        {
            List<Client> list = new List<Client>();

            try
            {
                list = await this.AppDbContext.Clients.ToListAsync();

                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message, response = list });
            }
        }

        [HttpGet]
        [Authorize]
        [Route("{id:int}")]
        public async Task<ActionResult> GetClientById(int id)
        {
            Client? dbClient = new Client();

            try
            {
                dbClient = await this.AppDbContext.Clients.FindAsync(id);
                
                if (dbClient == null) return StatusCode(StatusCodes.Status404NotFound, new { message = $"Client with id: {id} does not exists ", response = dbClient });
                dbClient.Appointments = this.AppDbContext.Appointments.Where(x => x.ClientId == id).ToList();
                return Ok(dbClient);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message, response = dbClient });
            }
        }

        [HttpGet]
        [Authorize]
        [Route("phone={phone}")]
        public async Task<ActionResult> GetClientByPhone(string phone)
        {
            Client? dbClient = new Client();

            try
            {
                dbClient = await this.AppDbContext.Clients.FirstOrDefaultAsync(x => x.Phone!.Equals(phone));

                if (dbClient == null) return StatusCode(StatusCodes.Status404NotFound, new { message = $"Client with phone: {phone} does not exists ", response = dbClient });
                dbClient.Appointments = this.AppDbContext.Appointments.Where(x => x.ClientId == dbClient.Id).ToList();
                return Ok(dbClient);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message, response = dbClient });
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Add([FromBody] Client model)
        {

            try
            {
                if (model != null)
                {
                    if(await CheckPhone(model.Phone!))
                    {
                        appDbContext.Clients.Add(model);
                    }
                    else
                    {
                        var (flag, message) = update(model);
                        if (!flag)
                        {
                            return StatusCode(StatusCodes.Status404NotFound, new { message = "NOT FOUND", response = model });
                        }
                    }
                    await AppDbContext.SaveChangesAsync();
                    return StatusCode(StatusCodes.Status200OK, new { message = "OK" });                    
                }
                else
                {
                    throw new NullReferenceException("Client was null");
                }
                
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { message = ex.Message });
            }
        }

        [HttpPost]
        [Authorize]
        [Route("update")]
        public async Task<ActionResult> Update([FromBody] Client model)
        {

            try
            {
                var(flag, message) = update(model);
                if (flag)
                {
                    await this.AppDbContext.SaveChangesAsync();
                    return StatusCode(StatusCodes.Status200OK, new { message = message, response = model});
                }

                return StatusCode(StatusCodes.Status404NotFound, new { message = "NOT FOUND", response = model });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        private ServiceResponse update(Client model)
        {
            try
            {
                Client dbModel = this.AppDbContext.Clients.FirstOrDefault(x => x.Phone!.Equals(model.Phone))!;
                if (dbModel != null)
                {
                    dbModel.Name = model.Name is null ? dbModel.Name : model.Name;
                    dbModel.Phone = model.Phone is null ? dbModel.Phone : model.Phone;
                    this.AppDbContext.Clients.Update(dbModel);

                    return new ServiceResponse(true, "Updated");
                }
                return new ServiceResponse(false, "Something went wrong");
            }
            catch (Exception)
            {
                throw;
            }

        }

        [HttpDelete]
        [Route("delete/{id:int}")]
        [Authorize]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                Client dbClient = this.AppDbContext.Clients.Find(id)!;
                if (dbClient != null)
                {

                    this.AppDbContext.Clients.Remove(dbClient);
                    await this.AppDbContext.SaveChangesAsync();

                    return StatusCode(StatusCodes.Status200OK, new { message = "OK", response = dbClient });
                }

                return StatusCode(StatusCodes.Status404NotFound, new { message = "NOT FOUND", response = id });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { message = ex.Message });
            }
        }

        private async Task<bool> CheckPhone(string phone)
        {
            var client = await appDbContext.Clients.FirstOrDefaultAsync(x => x.Phone!.ToLower()!.Equals(phone.ToLower()));
            return client is null ? true : false;
        }

        
    }
}
