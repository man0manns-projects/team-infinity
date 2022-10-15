using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using WebAPI2.Models;

namespace WebAPI2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FundraiserController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public FundraiserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("Donors")]
        [HttpGet]
        public JsonResult GetRecentDonors(int fundraiserID)
        {
            string query = @"
                    SELECT TOP 8 * FROM dbo.donations WHERE fundraiser_id = @current_fundraiser";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlParameter[] param = new SqlParameter[1];
                    param[0] = new SqlParameter("@current_fundraiser", fundraiserID);
                    myCommand.Parameters.Add(param[0]);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet]
        public JsonResult GetFundraiserInformation(int fundraiserID)
        {
            string query = @"
                    SELECT * FROM fundraisers WHERE fundraiser_id = @current_fundraiser";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlParameter[] param = new SqlParameter[1];
                    param[0] = new SqlParameter("@current_fundraiser", fundraiserID);
                    myCommand.Parameters.Add(param[0]);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

    }


}

