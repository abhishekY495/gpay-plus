const env = import.meta.env.VITE_ENV;
const localApiUrl = import.meta.env.VITE_LOCAL_API_URL;
const deployedApiUrl = import.meta.env.VITE_DEPLOYED_API_URL;

export const API_URL = env === "PROD" ? deployedApiUrl : localApiUrl;
export const guestCredentials = {
  username: "guest_testing",
  password: "guest12345",
};
