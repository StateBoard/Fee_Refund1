using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Fee_Refund_2021.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class Tbl_CollegePaymentDetails_new
    {
        public int id { get; set; }
        [Required(ErrorMessage = " Account Holder Details are required")]
        public string AccountHolderDetails { get; set; }
        [Required(ErrorMessage = " Account Number is required")]
        public string AccountNumber { get; set; }
        [Required(ErrorMessage = " IFSC Code is required")]
        public string IFSCCode { get; set; }
        [Required(ErrorMessage = " Bank Name is required")]
        public string BankName { get; set; }
        [Required(ErrorMessage = " Bank Name is required")]
        public string PrincipalName { get; set; }
        [Required(ErrorMessage = " You must provide a mobile number")]
        [DataType(DataType.PhoneNumber)]
        [RegularExpression(@"^(\d{10})$", ErrorMessage = "Not a valid  number")]
        public string PrincipalMobile { get; set; }
        [Required(ErrorMessage = "Principal Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string PrincipalEmail { get; set; }
        public string Index_No { get; set; }
        [Required(ErrorMessage = " Principal Signature is required")]
        public string PrincipalSignature { get; set; }
        public Nullable<int> Active { get; set; }
    }
}
