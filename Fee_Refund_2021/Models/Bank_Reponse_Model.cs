using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Fee_Refund_2021.Models
{
    public class Bank_Reponse_Model
    {
        public string utrn { get; set; }
        public string Status { get; set; }
        public string rejReason { get; set; }
    }
}