using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Twitter;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tweet.Clients;
using Tweet.Config;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tweet.Controllers
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Login()
        {
            return Challenge(new AuthenticationProperties() {  RedirectUri = "/Home/Token" }, TwitterDefaults.AuthenticationScheme);
        }

        public IActionResult Token()
        {
            return Content("Test");
        }

        [Authorize()]
        public async Task<IActionResult> Timeline([FromQuery(Name = "older")]string olderFrom, [FromQuery(Name = "newer")]string newerFrom)
        {
            var client = new TwitterClient(await this.HttpContext.GetTwitterAccessToken());
            var data = await client.GetTimeLine(olderFrom, newerFrom);
            return Content(data, "application/javascript");
        }
    }
}
