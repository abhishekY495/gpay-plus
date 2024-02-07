export const setCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "PROD",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    domain:
      process.env.NODE_ENV === "PROD"
        ? "https://gpay-plus.netlify.app"
        : "localhost",
  });
};
