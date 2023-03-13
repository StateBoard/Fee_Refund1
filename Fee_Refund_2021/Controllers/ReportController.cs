using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Fee_Refund_2021.Models;

namespace Fee_Refund_2021.Controllers
{
    public class ReportController : Controller
    {
        HSC_REFUND_2021Entities db = new HSC_REFUND_2021Entities();
        // GET: Report
        public ActionResult Division_Count()
        {
           

            List<Division_Report_Model> sscstudentlist = db.Database.SqlQuery<Division_Report_Model>(@"            select* from(SELECT Division_Code, Division_Name, (Complete+InComplete) Total_Register, Complete,InComplete FROM(
                select(select top 1 B.Division_Code from Tbl_Code_Master B where B.District_Code = SUBSTRING(A.Index_No, 1, 2)) Division_Code, (select top 1 B.Division_Name from Tbl_Code_Master B where B.District_Code = SUBSTRING(A.Index_No, 1, 2)) Division_Name, REPLACE(REPLACE(A.Active, '1', 'Complete'), '0', 'InComplete') Status from Tbl_CollegePaymentDetails A
            ) Z
            PIVOT
            (
            count(Status) FOR Status IN(Complete, InComplete)) AS Tab2
            union all
            SELECT '99','Total', (Sum(Complete) + Sum(InComplete)) Total_Register, Sum(Complete),Sum(InComplete) FROM(
              select(select top 1 B.Division_Code from Tbl_Code_Master B where B.District_Code = SUBSTRING(A.Index_No, 1, 2)) Division_Code, (select top 1 B.Division_Name from Tbl_Code_Master B where B.District_Code = SUBSTRING(A.Index_No, 1, 2)) Division_Name, REPLACE(REPLACE(A.Active, '1', 'Complete'), '0', 'InComplete') Status from Tbl_CollegePaymentDetails A
            ) Z
            PIVOT
            (
            count(Status) FOR Status IN(Complete, InComplete)) AS Tab2  ) X order by Division_Code").ToList();
            return View(sscstudentlist);

            //            select* from(SELECT Division_Code, Division_Name, (Complete+InComplete) Total_Register, Complete,InComplete FROM(
            //select  (select top 1 B.Division_Code from Tbl_Code_Master B where B.District_Code = SUBSTRING(A.Index_No, 1, 2)) Division_Code,(select top 1 B.Division_Name from Tbl_Code_Master B where B.District_Code = SUBSTRING(A.Index_No, 1, 2)) Division_Name, REPLACE(REPLACE(A.Active, '1', 'Complete'), '0', 'InComplete') Status from Tbl_CollegePaymentDetails A
            //            ) Z
            //            PIVOT
            //            (
            //            count(Status) FOR Status IN(Complete, InComplete)) AS Tab2
            //            union all
            //            SELECT '99','Total', (Sum(Complete) + Sum(InComplete)) Total_Register, Sum(Complete),Sum(InComplete) FROM(
            //              select(select top 1 B.Division_Code from Tbl_Code_Master B where B.District_Code = SUBSTRING(A.Index_No, 1, 2)) Division_Code, (select top 1 B.Division_Name from Tbl_Code_Master B where B.District_Code = SUBSTRING(A.Index_No, 1, 2)) Division_Name, REPLACE(REPLACE(A.Active, '1', 'Complete'), '0', 'InComplete') Status from Tbl_CollegePaymentDetails A
            //            ) Z
            //            PIVOT
            //            (
            //            count(Status) FOR Status IN(Complete, InComplete)) AS Tab2  ) X order by Division_Code
        }
    }
}