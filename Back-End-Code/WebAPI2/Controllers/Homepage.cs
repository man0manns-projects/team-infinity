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

        //other users fundraiser dashboard 
        [HttpGet]
        public JsonResult GetOtherFundraisers(int userID)
        {
            string query = @"
                    SELECT TOP 5 * FROM dbo.fundraisers WHERE user_id != @current_userid";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlParameter[] param = new SqlParameter[1];
                    param[0] = new SqlParameter("@current_userid", userID);
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
        public JsonResult GetMyFundraisers(int userID)
        {
            string query = @"
                    SELECT TOP 5 * FROM dbo.fundraisers WHERE user_id = @current_userid";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlParameter[] param = new SqlParameter[1];
                    param[0] = new SqlParameter("@current_userid", userID);
                    myCommand.Parameters.Add(param[0]);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        //return username for current user
        [Route("Hello")]
        [HttpGet]

        public JsonResult GetUsername(int userID)
        {
            string query = @"
                    SELECT f_name, l_name FROM users WHERE user_id = @current_userid";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlParameter[] param = new SqlParameter[1];
                    param[0] = new SqlParameter("@current_userid", userID);
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
        public JsonResult NewFundraiser(int userID, string fundraiserName, string fundraiserDescription, int initAmount, float goal, byte[] image)
        {
            //TODO: Add file upload
            //var imageDataByteArray = Convert.FromBase64String(model.ImageData);
            //var imageDataStream = new MemoryStream(imageDataByteArray);
            //imageDataStream.Position = 0;

            string query = @"
                    INSERT INTO dbo.fundraisers (user_id, title, txt_description, amount_raised, image , goal) VALUES (@userID, @title, @description, @amount, @image , @goal)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlParameter[] param = new SqlParameter[6];
                    param[0] = new SqlParameter("@userID", userID);
                    param[1] = new SqlParameter("@title", fundraiserName);
                    param[2] = new SqlParameter("@description", fundraiserDescription);
                    param[3] = new SqlParameter("@amount", initAmount);
                    param[4] = new SqlParameter("@image", image);
                    param[5] = new SqlParameter("@goal", goal);
                    myCommand.Parameters.Add(param[0]);
                    myCommand.Parameters.Add(param[1]);
                    myCommand.Parameters.Add(param[2]);
                    myCommand.Parameters.Add(param[3]);
                    myCommand.Parameters.Add(param[4]);
                    myCommand.Parameters.Add(param[5]);
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

