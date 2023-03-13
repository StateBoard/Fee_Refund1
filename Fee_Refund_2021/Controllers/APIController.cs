using Fee_Refund_2021.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Fee_Refund_2021.Controllers
{
    public class APIController : Controller
    {
        HSC_REFUND_2021Entities entity = new HSC_REFUND_2021Entities();
        // GET: API
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Bank_Response(Tbl_Bank model)
        {
            Bank_Reponse_Model tbl = new Bank_Reponse_Model();
            try
            {
                entity.Tbl_Bank.Add(model);
                entity.SaveChanges();

                tbl.Status = "Success";
                tbl.rejReason = "NA";
                tbl.utrn = model.utrn;
                return Json(tbl, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exe)
            {
                tbl.Status = "Failure";
                tbl.rejReason = "unable to save record"+ exe.ToString();
                tbl.utrn = model.utrn;
                return Json(tbl, JsonRequestBehavior.AllowGet);
            }

        }

    }
}