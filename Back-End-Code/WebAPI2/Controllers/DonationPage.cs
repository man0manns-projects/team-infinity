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
    public class DonationController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public DonationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //insert donation information
        [HttpPost]
        public JsonResult InsertDonationForm(int userID, int fundraiserID, float donationAmount, int paymentID, string notes, string streetAddress, string city, int zipcode, string country, string phone, string emailAddress, string transactionID, string firstName, string lastName)
        {
            string query = @"
                    INSERT INTO dbo.donations (user_id, fundraiser_id, donation_amt, payment_id, notes, street_address, city_town, zipcode, country, phone, email_address, transaction_id, f_name, l_name)
VALUES (@user_id, @this_fundraiser, @amount, @payment_type, @notes, @address, @city, @zip, @country, @phone_num, @email, @transaction_id, @f_name, @l_name)";
            string queryTwo = @"
                    UPDATE fundraisers SET amount_raised = amount_raised + @amount WHERE fundraiser_id = @this_fundraiser;";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlParameter[] param = new SqlParameter[14];
                    param[0] = new SqlParameter("@user_id", userID);
                    param[1] = new SqlParameter("@this_fundraiser", fundraiserID);
                    param[2] = new SqlParameter("@amount", donationAmount);
                    param[3] = new SqlParameter("@payment_type", paymentID);
                    param[4] = new SqlParameter("@notes", notes);
                    param[5] = new SqlParameter("@address", streetAddress);
                    param[6] = new SqlParameter("@city", city);
                    param[7] = new SqlParameter("@zip", zipcode);
                    param[8] = new SqlParameter("@country", country);
                    param[9] = new SqlParameter("@phone_num", phone);
                    param[10] = new SqlParameter("@email", emailAddress);
                    param[11] = new SqlParameter("@transaction_id", transactionID);
                    param[12] = new SqlParameter("@f_name", firstName);
                    param[13] = new SqlParameter("@l_name", lastName);
                    myCommand.Parameters.Add(param[0]);
                    myCommand.Parameters.Add(param[1]);
                    myCommand.Parameters.Add(param[2]);
                    myCommand.Parameters.Add(param[3]);
                    myCommand.Parameters.Add(param[4]);
                    myCommand.Parameters.Add(param[5]);
                    myCommand.Parameters.Add(param[6]);
                    myCommand.Parameters.Add(param[7]);
                    myCommand.Parameters.Add(param[8]);
                    myCommand.Parameters.Add(param[9]);
                    myCommand.Parameters.Add(param[10]);
                    myCommand.Parameters.Add(param[11]);
                    myCommand.Parameters.Add(param[12]);
                    myCommand.Parameters.Add(param[13]);
                    //TODO: Integrate with ReactJS variables
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                }
                using (SqlCommand moneyCommand = new SqlCommand(queryTwo, myCon))
                {
                    SqlParameter[] param = new SqlParameter[2];
                    param[0] = new SqlParameter("@this_fundraiser", fundraiserID);
                    param[1] = new SqlParameter("@amount", donationAmount);
                    moneyCommand.Parameters.Add(param[0]);
                    moneyCommand.Parameters.Add(param[1]);
                    //TODO: Integrate with ReactJS variables
                    myReader = moneyCommand.ExecuteReader();
                    myReader.Close();
                }
                myCon.Close();
            }
            //TODO: Could return the data here to pass into variables that will display on confirmation page
            return new JsonResult("200");

        }

        //insert card information
        [HttpPost]
        [Route("Card")]
        public JsonResult InsertCardInformation(string nickname, int userID, string cardNumber, string securityCode, string cardholderName, string expirationDate, string transactionID)
        {
            string query = @"
                    INSERT INTO dbo.cards (nickname, user_id, card_number, security_code, cardholder_name, expiration_date, transaction_id)
VALUES (@nickname, @user_id, @new_card, @new_security, @new_names, @new_exp_date, @transaction_id)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlParameter[] param = new SqlParameter[7];
                    param[0] = new SqlParameter("@nickname", nickname);
                    param[1] = new SqlParameter("@user_id", userID);
                    param[2] = new SqlParameter("@new_card", cardNumber);
                    param[3] = new SqlParameter("@new_security", securityCode);
                    param[4] = new SqlParameter("@new_names", cardholderName);
                    param[5] = new SqlParameter("@new_exp_date", expirationDate);
                    param[6] = new SqlParameter("@transaction_id", transactionID);
                    myCommand.Parameters.Add(param[0]);
                    myCommand.Parameters.Add(param[1]);
                    myCommand.Parameters.Add(param[2]);
                    myCommand.Parameters.Add(param[3]);
                    myCommand.Parameters.Add(param[4]);
                    myCommand.Parameters.Add(param[5]);
                    myCommand.Parameters.Add(param[6]);
                    //TODO: Integrate with ReactJS variables
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            //TODO: Could return the data here to pass into variables that will display on confirmation page
            return new JsonResult("200");

        }

        //insert bank information
        [HttpPost]
        [Route("Bank")]
        public JsonResult InsertBankInformation(string nickname, int userID, string routingNumber, string accountNumber, string transactionID)
        {
            string query = @"
                    INSERT INTO dbo.bankaccounts (nickname, user_id, routing_number, account_number, transaction_id)
VALUES ( @nickname, @user_id, @new_routing, @new_account_num, @transaction_id)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("FundraiserAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    SqlParameter[] param = new SqlParameter[5];
                    param[0] = new SqlParameter("@nickname", nickname);
                    param[1] = new SqlParameter("@user_id", userID);
                    param[2] = new SqlParameter("@new_routing", routingNumber);
                    param[3] = new SqlParameter("@new_account_num", accountNumber);
                    param[4] = new SqlParameter("@transaction_id", transactionID);
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
            //TODO: Could return the data here to pass into variables that will display on confirmation page
            return new JsonResult("200");

        }
    }
}

