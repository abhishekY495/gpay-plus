const env = import.meta.env.VITE_ENV;
const localApiUrl = import.meta.env.VITE_LOCAL_API_URL;
const deployedApiUrl = import.meta.env.VITE_DEPLOYED_API_URL;

export const API_URL = env === "PROD" ? deployedApiUrl : localApiUrl;
export const guestCredentials = { username: "guest", password: "guest12345" };
export const maxCookieAge = 30 * 24 * 60 * 60 * 1000;
export const cookieDefaultOptions = {
  path: "/",
  sameSite: "strict",
  maxAge: maxCookieAge,
  domain: env === "PROD" ? "https://gpay-plus.netlify.app" : "localhost",
};
