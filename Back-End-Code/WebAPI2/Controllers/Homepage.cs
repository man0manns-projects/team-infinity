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
    public class DashboardController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public DashboardController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult GetFundraiserDashboard(int current_userid)
        {
            string query = @"
                    SELECT TOP 8 * FROM dbo.fundraisers WHERE user_id != @current_userid";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlParameter[] param = new SqlParameter[1];
                    param[0] = new SqlParameter("@current_userid", current_userid);
                    myCommand.Parameters.Add(param[0]);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [Route("User")]
        [HttpGet]

        public JsonResult GetUserFundraisers(int my_userid)
        {
            string query = @"
                    SELECT TOP 8 * FROM dbo.fundraisers WHERE user_id = @current_userid";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlParameter[] param = new SqlParameter[1];
                    param[0] = new SqlParameter("@current_userid", my_userid);
                    myCommand.Parameters.Add(param[0]);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult NewFundraiser(int user, string fundraiserName, string fundraiserDescription, int initAmount)
        {
            //TODO: Add file upload
            //var imageDataByteArray = Convert.FromBase64String(model.ImageData);
            //var imageDataStream = new MemoryStream(imageDataByteArray);
            //imageDataStream.Position = 0;

            string query = @"
                    INSERT INTO dbo.fundraisers (user_id, title, txt_description, amount_raised, img_url) VALUES (@userID, @title, @description, @amount, NULL)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlParameter[] param = new SqlParameter[4];
                    param[0] = new SqlParameter("@userID", user);
                    param[1] = new SqlParameter("@title", fundraiserName);
                    param[2] = new SqlParameter("@description", fundraiserDescription);
                    param[3] = new SqlParameter("@amount", initAmount);
                    myCommand.Parameters.Add(param[0]);
                    myCommand.Parameters.Add(param[1]);
                    myCommand.Parameters.Add(param[2]);
                    myCommand.Parameters.Add(param[3]);
                    //TODO: Integrate with ReactJS variables
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("200");

        }

    }
}

