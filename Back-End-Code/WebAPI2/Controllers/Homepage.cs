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

        public JsonResult Get(int current_userid)
        {
            string query = @"
                    SELECT TOP 8 FROM application.fundraiser WHERE user_id != @current_userid";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
            SqlDataReader myReader;
            using(SqlConnection myCon = new SqlConnection (sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlParameter[] param = new SqlParameter[2];
                    param[0] = new SqlParameter("@username", current_userid);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

    }

    //insert new fundraiser
    [HttpPost]
    public JsonResult Post(string firstName, string lastName, string usernameEmail, string password)
    {
        string query = @"
                    INSERT INTO dbo.users (f_name, l_name, email_address, password) VALUES (@firstName, @lastName, @usernameEmail, @pwd)";
        DataTable table = new DataTable();
        string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
        SqlDataReader myReader;
        using (SqlConnection myCon = new SqlConnection(sqlDataSource))
        {
            myCon.Open();
            using (SqlCommand myCommand = new SqlCommand(query, myCon))
            {
                SqlParameter[] param = new SqlParameter[4];
                param[0] = new SqlParameter("@firstName", firstName);
                param[1] = new SqlParameter("@lastName", lastName);
                param[2] = new SqlParameter("@usernameEmail", usernameEmail);
                param[3] = new SqlParameter("@pwd", password);
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
