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
        public const string TwitterConsumerKey = "a6p1KptmSRM7b5B1ZmP0amtsY";
        public const string TwitterConsumerSecret = "6SfpTl1ntkDc6IQH7LAXTw1gICNO8t1juQFpz56oXo1sYP2eBr";

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
