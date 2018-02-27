using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Twitter;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tweet.Config
{
    public static class TwitterConfig
    {
        public const string TwitterConsumerKey = "1LuonNmODD3RxXFq5CAOEyXiy";
        public const string TwitterConsumerSecret = "j5tp3tg2zmYRChxrDOdMVwY6wqLkFx79VlVYuHP2fX2KakaH94";

        public static async Task<TwitterAccessToken> GetTwitterAccessToken(this HttpContext context)
        {
            return new TwitterAccessToken
            {
                Token = await context.GetTokenAsync(TwitterDefaults.AuthenticationScheme, "access_token"),
                Secret = await context.GetTokenAsync(TwitterDefaults.AuthenticationScheme, "access_token_secret"),
                ScreenName = context.User.Identity.Name
            };
        }
    }
}
