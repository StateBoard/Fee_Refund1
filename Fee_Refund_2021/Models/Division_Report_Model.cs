using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Fee_Refund_2021.Models
{
    public class Division_Report_Model
    {
        public string Division_Code { get; set; }
        public string Division_Name { get; set; }
       public Int32 Total_Register { get; set; }

       public Int32 Complete { get; set; }
        public Int32 InComplete { get; set; }
    }
}