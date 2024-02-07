const env = import.meta.env.VITE_ENV;
const localApiUrl = import.meta.env.VITE_LOCAL_API_URL;
const deployedApiUrl = import.meta.env.VITE_DEPLOYED_API_URL;

export const API_URL = env === "PROD" ? deployedApiUrl : localApiUrl;
export const guestCredentials = { username: "guest", password: "guest12345" };
export const cookieDefaultOptions = {
  path: "/",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
  secure: env === "PROD",
  domain: env === "PROD" ? "gpay-plus.netlify.app" : "localhost",
};
