using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TurnosAppBackend.Data;
using TurnosAppBackend.Models;

namespace TurnosAppBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController(AppDbContext appDbContext) : ControllerBase
    {
        public AppDbContext AppDbContext { get; set; } = appDbContext;

        [HttpGet]
        public async Task<ActionResult> GetList()
        {
            List<Service> list = new List<Service>();

            try
            {
                list = await this.AppDbContext.Services.ToListAsync();

                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message, response = list });
            }
        }
        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult> GetServiceById(int id)
        {
            Service? dbService = new Service();

            try
            {
                dbService = await this.AppDbContext.Services.FindAsync(id);

                if (dbService == null) return StatusCode(StatusCodes.Status404NotFound, new { message = $"Service with id: {id} does not exists ", response = dbService });
                
                return Ok(dbService);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message, response = dbService });
            }
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] Service model)
        {

            try
            {
                if (model != null)
                {
                    if (model.Name is null || model.Price is null) return StatusCode(StatusCodes.Status500InternalServerError, new { message = "All fields are required" });
                    model.IsActive = true;
                    AppDbContext.Services.Add(model);                    
                    await AppDbContext.SaveChangesAsync();
                    return StatusCode(StatusCodes.Status200OK, new { message = "OK" });
                }
                else
                {
                    throw new NullReferenceException("Service was null");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPost]
        [Route("update")]
        public async Task<ActionResult> Update([FromBody] Service model)
        {

            try
            {
                Service dbModel = this.AppDbContext.Services.Find(model.Id)!;
                if (dbModel != null)
                {
                    dbModel.Name = model.Name is null ? dbModel.Name : model.Name;
                    dbModel.Price = model.Price is null ? dbModel.Price : model.Price;
                    dbModel.IsActive = model.IsActive is null ? dbModel.IsActive : model.IsActive;
                    this.AppDbContext.Services.Update(dbModel);
                    await this.AppDbContext.SaveChangesAsync();
                    return StatusCode(StatusCodes.Status200OK, new { message = "Service Updated", response = dbModel });
                }

                return StatusCode(StatusCodes.Status404NotFound, new { message = "NOT FOUND", response = model });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }


        [HttpDelete]
        [Route("delete/{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                Service dbService = this.AppDbContext.Services.Find(id)!;
                if (dbService != null)
                {

                    this.AppDbContext.Services.Remove(dbService);
                    await this.AppDbContext.SaveChangesAsync();

                    return StatusCode(StatusCodes.Status200OK, new { message = "OK", response = dbService });
                }

                return StatusCode(StatusCodes.Status404NotFound, new { message = "NOT FOUND", response = id });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { message = ex.Message });
            }
        }
    }
}
