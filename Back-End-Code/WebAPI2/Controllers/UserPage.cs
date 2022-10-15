using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using WebAPI2.Models;

namespace WebAPI2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        //get user information 
        [HttpGet]

        public JsonResult GetUserInfo(int userID)
        {
            string query = @"
                    SELECT * FROM users WHERE user_id= @user_id";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlParameter[] param = new SqlParameter[1];
                    param[0] = new SqlParameter("@user_id", userID);
                    myCommand.Parameters.Add(param[0]);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        //update user information 
        [HttpPost]
        public JsonResult UpdateUser(int userID, string firstName, string lastName, string userEmail, string password)
        {
            string query = @"
                    UPDATE users SET f_name = @new_fname, l_name = @new_lname, email_address = @new_email, password= @new_password WHERE user_id = @user_id";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlParameter[] param = new SqlParameter[5];
                    param[0] = new SqlParameter("@user_id", userID);
                    param[1] = new SqlParameter("@new_fname", firstName);
                    param[2] = new SqlParameter("@new_lname", lastName);
                    param[3] = new SqlParameter("@new_email", userEmail);
                    param[4] = new SqlParameter("@new_password", password);
                    myCommand.Parameters.Add(param[0]);
                    myCommand.Parameters.Add(param[1]);
                    myCommand.Parameters.Add(param[2]);
                    myCommand.Parameters.Add(param[3]);
                    myCommand.Parameters.Add(param[4]);
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
