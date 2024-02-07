import { env } from "./constants";

export const storeCookie = (setCookie, token) => {
  setCookie("token", token, {
    secure: env === "PROD",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 100,
    domain: env === "PROD" ? "https://gpay-plus.netlify.app" : "localhost",
  });
};
