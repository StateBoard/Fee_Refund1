using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.IO;
using System.Configuration;
using Fee_Refund_2021.Models;
namespace Fee_Refund_2021.Controllers
{
    public class CollegeController : Controller
    {
        HSC_REFUND_2021Entities db = new HSC_REFUND_2021Entities();
        // GET: College
        public ActionResult Student_List()
        {
            string Index_No = Session["Index_No"].ToString();

            if (db.Tbl_CollegePaymentDetails.Any(a => a.Index_No == Index_No && a.Active == 1))
            {
                return RedirectToAction("School_Report");
            }

            if (Session["Index_No"] != null && db.Tbl_CollegePaymentDetails.Any(a => a.Index_No == Index_No))
            {
                List<Tbl_Student> tbl = db.Tbl_Student.Where(a => a.schol_no == Index_No).OrderBy(a => a.seat_no).ToList();

                return View(tbl);
            }
            else
            {
                return RedirectToAction("Dashboard");

               // return Json(new { Result = false, Message = "Something Went Wrong! Fill All the Records." }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Dashboard()
        {
            string Index_No = Session["Index_No"].ToString();

            Tbl_CollegePaymentDetails tbl_CollegePaymentDetails = db.Tbl_CollegePaymentDetails.Where(x => x.Index_No == Index_No).FirstOrDefault();

            Tbl_Student tbl_student = db.Tbl_Student.Where(x => x.schol_no == Index_No && x.Fee_Paid == null &&  x.Status == "checked").FirstOrDefault();

            if(tbl_student !=null)
            {
                return RedirectToAction("Fee_Paid", "College");
            }
            else
            {
                return RedirectToAction("Receipt", "College");
            }

            //if (tbl_CollegePaymentDetails != null)
            //{
            //    ViewData["Active"] = tbl_CollegePaymentDetails.Active;

            //    if (ViewData["Active"].ToString() == "1")
            //    {
            //        //return RedirectToAction("School_Report", "College");
            //        return RedirectToAction("Fee_Paid", "College");
            //    }
            //    else
            //    {
            //        return View(tbl_CollegePaymentDetails);
            //    }
            //}
            //else
            //{
            //    return View();
            //}
           
        }

        [HttpPost]
        public ActionResult Dashboard(Tbl_CollegePaymentDetails model, HttpPostedFileBase imgfile)
        {
            if (model.IFSCCode.Length != 11)
            {
                ViewBag.ErrorMessage = "IFSC Code Should Be 11 Digit";
                return View();
            }
            
            if (model.AccountHolderDetails==null||model.AccountNumber==null||model.IFSCCode==null|| model.BankName==null||model.PrincipalName==null||model.PrincipalMobile==null||model.PrincipalEmail==null)
            {
                ViewBag.ErrorMessage = "Please Fill Complete Information";
                return View();
            }
            if (model.PrincipalMobile.Length != 10)
            {
                ViewBag.ErrorMessage = "Invalid Mobile No";
                return View();
            }
            if (!model.PrincipalEmail.Contains("@"))
            {
                ViewBag.ErrorMessage = "Invalid Email ID";
                return View();
            }
            for (int i = 0; i < model.PrincipalMobile.Length; i++)
            {
                if (!char.IsDigit(model.PrincipalMobile[i]))
                {
                    ViewBag.ErrorMessage = "Invalid Mobile No";
                    return View();
                }
            }
            
            string Index_No = Session["Index_No"].ToString();
            string path = uploadimage(imgfile);
            var ExistingRec = db.Tbl_CollegePaymentDetails.Where(x => x.Index_No == Index_No && x.Active == 0).FirstOrDefault();
            if (ExistingRec != null)
            {
                ExistingRec.AccountHolderDetails = model.AccountHolderDetails;
                ExistingRec.AccountNumber = model.AccountNumber;
                ExistingRec.IFSCCode = model.IFSCCode;
                ExistingRec.BankName = model.BankName;
                ExistingRec.PrincipalName = model.PrincipalName;
                ExistingRec.PrincipalMobile = model.PrincipalMobile;
                ExistingRec.PrincipalEmail = model.PrincipalEmail;
                ExistingRec.Index_No = Index_No;
                ExistingRec.PrincipalSignature = path;
                ExistingRec.Active = 0;
                ExistingRec.Date_time = DateTime.Now.ToString();

                db.SaveChanges();
            }

            if(ExistingRec == null)
            {
                if (path.Equals("-1"))
                {

                }
                else
                {
                    model.Active = 0;
                    model.Index_No = Index_No;
                    model.Date_time = DateTime.Now.ToString();
                    model.PrincipalSignature = path;
                    db.Tbl_CollegePaymentDetails.Add(model);
                }
            }
            
            try
            {
                if (ModelState.IsValid)
                {
                    db.SaveChanges();
                    Response.Write("<script>alert('saved successfully!!!')</script>");
                    ModelState.Clear();
                    return RedirectToAction("Student_List");
                }
                else
                {
                    return RedirectToAction("Dashboard");
                }
            }
            catch (Exception e)
            {
                Response.Write("<script>alert('Not saved successfully!!!')</script>" + e);

                return RedirectToAction("Dashboard");
            }

        }

        public string uploadimage(HttpPostedFileBase file)
        {
            string Index_No = Session["Index_No"].ToString();
            string path = "-1";
           

            if (file != null && file.ContentLength > 0)
            {
                string extension = Path.GetExtension(file.FileName);
                string signImg;

                if (extension.ToLower().Equals(".jpg") || extension.ToLower().Equals(".jpeg") || extension.ToLower().Equals(".png"))
                {
                    try
                    {
                        signImg = Index_No + extension;
                        path = Path.Combine(Server.MapPath("~/PrincipalSignature/"), signImg);

                        file.SaveAs(path);

                        path = "~/PrincipalSignature/" + signImg;
                    }

                    catch (Exception ex)
                    {

                        path = "-1";

                    }

                }
                else
                {

                    Response.Write("<script>alert('Only jpg ,jpeg or png formats are acceptable....'); </script>");

                }

            }

            else
            {
                Response.Write("<script>alert('Please Fill All Fields'); </script>");

                path = "-1";
            }

            return path;

        }

        public ActionResult Help2()
        {
            return View();
        }



        public ActionResult Receipt()
        {
            string Index_No = Session["Index_No"].ToString();
            List<Tbl_Student> tbl = db.Tbl_Student.Where(a => a.schol_no == Index_No).OrderBy(a => a.seat_no).ToList();

            return View(tbl);
        }


        [HttpPost]
        public JsonResult Receipt_Tbl()
        {
            string Index_No = Session["Index_No"].ToString();

            var model = db.Tbl_Student.Where(x => x.schol_no == Index_No && x.Fee_Paid == "Paid").Select(n => new
            {
                n.schol_no,
                n.seat_no,
                n.name,
                n.mname

            }).OrderBy(a => a.seat_no).ToList();

            var total_std = db.Tbl_Student.Where(y => y.schol_no == Index_No && y.Status == "checked").Count();
            var qulified_std = model.Count();
            var unqualified_std = total_std - qulified_std;
            var hsc = ConfigurationManager.AppSettings["HSC"];
            var Refund_Amount = unqualified_std * Int32.Parse(hsc);
            return Json(new { Result = true, data = model, total_std = total_std, qulified_std = qulified_std, unqualified_std = unqualified_std, Refund_Amount = Refund_Amount }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            return RedirectToAction("HomePage", "Home");
        }

        public JsonResult Get_Student(int Index_ID, string Checked)
        {
            string Index_No = Session["Index_No"].ToString();
            Tbl_Student std = db.Tbl_Student.Where(a => a.id == Index_ID).FirstOrDefault();

            try
            {
                std.Status = Checked;
                std.Date_Time = DateTime.Now.ToString();
                db.Tbl_Student.Attach(std);
                db.Entry(std).Property(x => x.Status).IsModified = true;
                db.Entry(std).Property(x => x.Date_Time).IsModified = true;
                db.SaveChanges();

                var count = db.Tbl_Student.Where(a => a.Status == null && a.schol_no == Index_No).Count();
                return Json(new { Result = "true", Message = count }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { Result = true, ex }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult School_Report()
        {
            string Index_No = Session["Index_No"].ToString();
            List<Tbl_Student> tbl = db.Tbl_Student.Where(a => a.schol_no == Index_No).OrderBy(a => a.seat_no).ToList();

            return View(tbl);
        }


        [HttpPost]
        public JsonResult School_Report_Tbl()
        {
            string Index_No = Session["Index_No"].ToString();
            string amount= ConfigurationManager.AppSettings["HSC"] +"INR";
            var model = db.Tbl_Student.Where(x => x.schol_no == Index_No && x.Status == "checked").Select(n => new
            {

                SeatNo = n.seat_no,
                Name = n.name,
                MotherName = n.mname,
                Status = n.Status.Replace("checked", "Eligible"),
                Amount = amount,
                Refund_Date = "",
                Signature = ""

            }).OrderBy(a => a.SeatNo).ToList();

            var total_std = db.Tbl_Student.Where(y => y.schol_no == Index_No).Count();
            var qulified_std = model.Count();
            var unqualified_std = total_std - qulified_std;

            return Json(new { Result = true, data = model, total_std = total_std, qulified_std = qulified_std, unqualified_std = unqualified_std }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult Fee_Paid()
        {
            string Index_No = Session["Index_No"].ToString();
            if (db.Tbl_CollegePaymentDetails.Any(a => a.Index_No == Index_No && a.Active == 1))
            {
                List<Tbl_Student> tbl = db.Tbl_Student.Where(a => a.schol_no == Index_No && a.Status == "checked").OrderBy(a => a.seat_no).ToList();
                return View(tbl);
            }
           
            return RedirectToAction("Dashboard");
        }

        [HttpPost]
        public JsonResult Fee_Paid(int Index_id, string Checked, string Date)
        {
            {
                string Index_No = Session["Index_No"].ToString();
                Tbl_Student std = db.Tbl_Student.Where(a => a.id == Index_id).FirstOrDefault();
                try
                {
                    std.Fee_Paid = Checked;
                    if (Checked == "UnPaid")
                    {
                        std.Date = "";
                    }
                    if (Checked == "Paid")
                    {
                        std.Date = Date;
                    }
                    db.Tbl_Student.Attach(std);

                    db.Entry(std).Property(x => x.Fee_Paid).IsModified = true;  
                    db.Entry(std).Property(x => x.Date).IsModified = true;

                    db.SaveChanges();

                    var count = db.Tbl_Student.Where(a => a.Status == null && a.schol_no == Index_No).Count();
                    return Json(new { Result = "true", Message = count }, JsonRequestBehavior.AllowGet);

                }
                catch (Exception ex)
                {
                    return Json(new { Result = true, ex }, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public JsonResult Student_Remaining2()
        {
            string Index_No = Session["Index_No"].ToString();
            int cnt = db.Tbl_Student.Where(a => a.Fee_Paid == null && a.Date == null && a.Status == "checked" && a.schol_no == Index_No).Count();
            if (cnt == 0)
            {
                return Json(new { Result = true }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { Result = false, Message = "Fill all the student records" }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult Student_Remaining()
        {
            string Index_No = Session["Index_No"].ToString();
            int cnt = db.Tbl_Student.Where(a => a.Status == null && a.schol_no == Index_No).Count();
            Tbl_CollegePaymentDetails Obj = new Tbl_CollegePaymentDetails();
            Obj = db.Tbl_CollegePaymentDetails.Where(a => a.Index_No == Index_No).FirstOrDefault();
            if (cnt == 0)
            {
                Obj.Active = 1;
                db.SaveChanges();

                return Json(new { Result = true, RedirectURL = "../College/School_Report" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { Result = false, Message = "Fill all the student records" }, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult Qualified_Students()
        {
            string Index_No = Session["Index_No"].ToString();
            var Total_stud = db.Tbl_Student.Where(y => y.schol_no == Index_No).Count();
           
            var model = db.Tbl_Student.Where(x => x.schol_no == Index_No && x.Status == "checked").AsEnumerable().Select((n, index) => new
            {
                SRNO = index + 1,
                School_No = n.schol_no,
                Seat_No = n.seat_no,
                Name = n.name,
                Mother_Name = n.mname,
                Status = n.Status.Replace("checked", "Eligible")

            }).OrderBy(a => a.Seat_No).ToList();

            var Eligible_stud = model.Count();
            var Not_Eligible = Total_stud - Eligible_stud;
            var Refund_Amount = Eligible_stud * 94;

            return Json(new { Result = true, data = model, Total_stud = Total_stud, Eligible_stud = Eligible_stud, Not_Eligible = Not_Eligible, Refund_Amount = Refund_Amount }, JsonRequestBehavior.AllowGet);

        }

    }
}