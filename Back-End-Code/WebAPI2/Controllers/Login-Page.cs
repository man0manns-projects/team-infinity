using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using WebAPI2.Models;

namespace WebAPI2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TestController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get(string username,string password)
        {
            //DONT DO THIS - this is for simplicity. Instead use stored procedures with parameters.
            string query = @"
                    SELECT user_id FROM application.users WHERE username=@username AND password=@pwd";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
            SqlDataReader myReader;
            using(SqlConnection myCon = new SqlConnection (sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlParameter[] param = new SqlParameter[2];
                    param[0] = new SqlParameter("@username", txtUsername.Text);
                    param[1] = new SqlParameter("@pwd", txtPwd.Text);
                    myCommand.Parameters.Add(param[0]);
                    myCommand.Parameters.Add(param[1]);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            //TODO: Add else statement here for if credentials are invalid
            return new JsonResult(table);
        }

    }
}
