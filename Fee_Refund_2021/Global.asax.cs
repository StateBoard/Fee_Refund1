using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Fee_Refund_2021
{
    public class MvcApplication : System.Web.HttpApplication
    {
        
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            MvcHandler.DisableMvcResponseHeader = true;

        }

        protected void Application_PreSendRequestHeaders(object sender, EventArgs e)
        {
            HttpContext.Current.Response.Headers.Remove("X-Powered-By");
            HttpContext.Current.Response.Headers.Remove("X-AspNet-Version");
            HttpContext.Current.Response.Headers.Remove("X-AspNetMvc-Version");
            HttpContext.Current.Response.Headers.Remove("Server");
            HttpContext.Current.Response.AppendHeader("Cache-Control", "no-cache, no-store, must-revalidate");

        }
        protected void Application_EndRequest()
        {
            string authCookie = System.Web.Security.FormsAuthentication.FormsCookieName;
            foreach (string sCookie in Response.Cookies)
            {
                if (sCookie == authCookie || sCookie == "ASP.NET_SessionId")
                {
                    if (System.Environment.Version.Major < 2)
                    {
                        // Force HttpOnly to be added to the cookie header under 1.x
                        Response.Cookies[sCookie].Path += ";HttpOnly";
                    }
                }
                //Force all cookies to SSL regardless of web.config settings!
                Response.Cookies[sCookie].Secure = true;
                // Response.Cookies["ASP.NET_SessionId"].Secure = true;
            }
        }

    }
}
