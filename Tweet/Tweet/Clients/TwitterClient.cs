using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;
using System.Threading.Tasks;
using Tweet.Config;
using System.Text.Encodings.Web;
using System.Net.Http;
using System.Net.Http.Headers;

namespace Tweet.Clients
{
    public class TwitterClient
    {
        private static readonly DateTime Epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        private const string TimeLineUrl = "https://api.twitter.com/1.1/statuses/home_timeline.json";
        private TwitterAccessToken _token;

        public TwitterClient(TwitterAccessToken token)
        {
            _token = token;
            
        }

        public async Task GetTimeLine()
        {
            var authorizationParts = GetAuthParts();
            var parameterString = GetParameterString(authorizationParts);
            var canonicalizedRequestBuilder = new StringBuilder();
            canonicalizedRequestBuilder.Append(HttpMethod.Get.Method);
            canonicalizedRequestBuilder.Append("&");
            canonicalizedRequestBuilder.Append(UrlEncoder.Default.Encode(TimeLineUrl));
            canonicalizedRequestBuilder.Append("&");
            canonicalizedRequestBuilder.Append(UrlEncoder.Default.Encode(parameterString));
            var authHeader = GetAuthHeader(TimeLineUrl, canonicalizedRequestBuilder.ToString(), authorizationParts);

            var client = new HttpClient();
            client.DefaultRequestHeaders.TryAddWithoutValidation("Authorization", authHeader);

            var response = await client.GetAsync(TimeLineUrl);
        }

        private SortedDictionary<string, string> GetAuthParts() {
            var nonce = Guid.NewGuid().ToString("N");
            var authorizationParts = new SortedDictionary<string, string>
                        {
                            { "oauth_consumer_key", TwitterConfig.TwitterConsumerKey },
                            { "oauth_nonce", nonce },
                            { "oauth_signature_method", "HMAC-SHA1" },
                            { "oauth_timestamp", GenerateTimeStamp() },
                            { "oauth_token", _token.Token },
                            { "oauth_version", "1.0" }
                        };
            return authorizationParts;
        }

        private string GetParameterString(SortedDictionary<string, string> authorizationParts) {

            var parameterBuilder = new StringBuilder();
            foreach (var authorizationKey in authorizationParts)
            {
                parameterBuilder.AppendFormat("{0}={1}&", UrlEncoder.Default.Encode(authorizationKey.Key), UrlEncoder.Default.Encode(authorizationKey.Value));
            }
            parameterBuilder.Length--;
            var parameterString = parameterBuilder.ToString();
            return parameterString;
        }

        private string GetAuthHeader(string url, string payload, SortedDictionary<string, string> authorizationParts)
        {
            var signature = ComputeSignature(TwitterConfig.TwitterConsumerSecret, _token.Secret, payload);
            authorizationParts.Add("oauth_signature", signature);

            var authorizationHeaderBuilder = new StringBuilder();
            authorizationHeaderBuilder.Append("OAuth ");
            foreach (var authorizationPart in authorizationParts)
            {
                authorizationHeaderBuilder.AppendFormat(
                    "{0}=\"{1}\", ", authorizationPart.Key, UrlEncoder.Default.Encode(authorizationPart.Value));
            }
            authorizationHeaderBuilder.Length = authorizationHeaderBuilder.Length - 2;

            return authorizationHeaderBuilder.ToString();
        }

        private static string GenerateTimeStamp()
        {
            var secondsSinceUnixEpocStart = DateTime.UtcNow - Epoch;
            return Convert.ToInt64(secondsSinceUnixEpocStart.TotalSeconds).ToString(CultureInfo.InvariantCulture);
        }

        private string ComputeSignature(string consumerSecret, string tokenSecret, string signatureData)
        {
            using (var algorithm = new HMACSHA1())
            {
                algorithm.Key = Encoding.ASCII.GetBytes(
                    string.Format(CultureInfo.InvariantCulture,
                        "{0}&{1}",
                        UrlEncoder.Default.Encode(consumerSecret),
                        string.IsNullOrEmpty(tokenSecret) ? string.Empty : UrlEncoder.Default.Encode(tokenSecret)));
                var hash = algorithm.ComputeHash(Encoding.ASCII.GetBytes(signatureData));
                return Convert.ToBase64String(hash);
            }
        }
    }
}
