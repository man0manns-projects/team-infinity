using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using WebAPI2.Models;

namespace WebAPI2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]

        public JsonResult Get(string userEmail, string password)
        {
            string query = @"
                    SELECT user_id FROM dbo.users WHERE email_address=@username AND password=@pwd";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlParameter[] param = new SqlParameter[2];
                    param[0] = new SqlParameter("@username", userEmail);
                    param[1] = new SqlParameter("@pwd", password);
                    myCommand.Parameters.Add(param[0]);
                    myCommand.Parameters.Add(param[1]);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            //TODO: in ReactJS -  IF EMPTY then wrong credentials. If returns userid then correct credentials
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult NewUser(string firstName, string lastName, string userEmail, string password)
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
                    param[2] = new SqlParameter("@usernameEmail", userEmail);
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
}
