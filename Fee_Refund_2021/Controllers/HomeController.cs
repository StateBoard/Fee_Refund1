using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Fee_Refund_2021.Models;
using CaptchaMvc.HtmlHelpers;

namespace Fee_Refund_2021.Controllers
{
    public class HomeController : Controller
    {
        HSC_REFUND_2021Entities db = new HSC_REFUND_2021Entities();
        // GET: Home
        public ActionResult HomePage()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }


        [HttpGet]
        public ActionResult Change_Pass()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Change_pass(string login_id, string password)
        {
            Tbl_Login lg = db.Tbl_Login.Where(a=> a.login_id == login_id).FirstOrDefault();
            try
            {
                string Index = login_id.ToLower();
                if (lg.login_id == Index)
                {
                    lg.password = password;
                }
                db.Tbl_Login.Attach(lg);

                db.Entry(lg).Property(x => x.password).IsModified = true;
                db.SaveChanges();
            }
            catch(Exception e)
            {
                return Json(new { Result = "false", Message = "Something Went Wrong!" }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { Result = "true", Message = "Password changed successfully" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Help()
        {
            return View();
        }

        public ActionResult Error()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Login(Tbl_Login model)
        {
            if (this.IsCaptchaValid("Captcha is not valid"))
            {
                if (db.Tbl_Login.Where(a => a.login_id == model.login_id && a.password == model.password).Any())
                {
                    var sch_id = model.login_id;
                    string Index = sch_id.ToLower();
                    Session["Index_No"] = Index.Replace("j", "").Replace("_1", "").Replace("_2", "").Replace("s", "").Replace("_3", "").Replace("_4", "");
                    string Index_No = Session["Index_No"].ToString();
                    if (db.Tbl_CollegePaymentDetails.Where(a=> a.Index_No == Index_No && a.Active == 0).Any())
                    {
                        return RedirectToAction("Student_List", "College");
                    }
                    else
                    {
                        return RedirectToAction("Dashboard", "College");
                    }
                }
                else
                {
                    ViewBag.ErrMessage = "Error: Login Failed.";
                    ViewBag.Error = "सदर 2020-2021 योजनेत आपल्या कनिष्ठ महाविद्यलयातील/शाळेतील विद्यार्थी लाभार्थी नाहीत  किंवा  Login ID / Password . चुकीचा आहे ";
                    return View();
                }
            }
            {
                ViewBag.ErrMessage = "Error: captcha is not valid.";
                ViewBag.Error = "सदर 2020-2021 योजनेत आपल्या कनिष्ठ महाविद्यलयातील/शाळेतील विद्यार्थी लाभार्थी नाहीत  किंवा  Login ID / Password . चुकीचा आहे ";
                return View();
            }
        }
    }
}
