using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Twitter;
using Microsoft.AspNetCore.Mvc;

namespace Tweet.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }

        public IActionResult SignIn() {
            return Challenge(new AuthenticationProperties() { RedirectUri = "/Home/Index" }, TwitterDefaults.AuthenticationScheme);
        }
    }
}